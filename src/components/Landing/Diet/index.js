import React from "react";
import FitnessDietPlan from "./FitnessDietPlan";
import DietPlanProducts from "./DietPlanProducts";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PackageDetails from "./PackageDetails";
import { firebase } from "../../firebase";
import { Modal } from "react-bootstrap";
import Acknowledgement from "./Acknowledgement";
import FitnessForm from "./FitnessForm";
import YogaForm from "./YogaForm";
import "../../../css/Diet.css";
import { TotalAmount, Description, FinalPlan } from "../../../actions";
class Diet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  closepackagedetails() {
    this.setState({
      show: false
    });
  }

  componentDidMount() {
    if (this.props.diet.description && firebase.auth().currentUser) {
      this.setState({
        show: true
      });
    }
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div
        style={{
          marginLeft: this.props.userRenderPage === "ChooseDietPlan" ? 100 : 0
        }}
      >
        <DietPlanProducts />

        <center>
          <img
            src={require("../../../assests/diet_landing.png")}
            style={{ width: "100%" }}
          />
        </center>

        {this.props.User && firebase.auth().currentUser ? (
          <Modal
            backdrop={"static"}
            show={this.state.show}
            scrollable={true}
            onHide={() => this.closepackagedetails()}
            className="blah"
          >
            <Modal.Header closeButton className="PackageDetails_Header">
              <h5>Diet Plan</h5>
            </Modal.Header>
            <PackageDetails closepackage={() => this.closepackagedetails()} />
          </Modal>
        ) : null}

        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.acknowledgementform}
          onHide={() => this.closeacknowledgementform()}
          className="enroll-now-container-diet"
          style={{
            background: "rgba(0,0,0,.03",
            padding: "40px 20px"
          }}
        >
          <Modal.Header closeButton className="Acknowledgement_Header">
            <h3>Acknowledgement</h3>
          </Modal.Header>

          <Acknowledgement
            closeParentAck={() => this.closeacknowledgementform()}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return {
    userRenderPage: State.userDetail.userpage,
    service: State.serviceState.services,
    User: State.dietPlan,
    formType: State.serviceState.formType,
    diet: State.dietPlan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getamount: amount => {
      dispatch(TotalAmount(amount));
    },
    getdescription: description => {
      dispatch(Description(description));
    },
    getplan: plan => {
      dispatch(FinalPlan(plan));
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Diet));
