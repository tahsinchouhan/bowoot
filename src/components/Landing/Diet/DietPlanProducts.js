import React from "react";
import {
  dietplan,
  FinalPlan,
  TotalAmount,
  ServiceforForm,
  Description,
  PaymentTransactionDietPlans,
  type_of_diet
} from "../../../actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../../firebase";
import DietProducts from "./DietProducts";
import {
  Card,
  Modal,
  Collapse,
  Container,
  Accordion,
  Button
} from "react-bootstrap";
import Payment from "../Payment";
import "../../../css/Products.css";
import PackageDetails from "./PackageDetails";
import YogaForm from "./YogaForm";
import Header from "./../../Header";
import CustomSpinner from "../../Custom/spinner";
import Acknowledgement from "./Acknowledgement";
import TransactionFailure from "./TransactionFailure";
class Productinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packagedetails: false,
      loading: false,
      dropButton: []
    };
  }

  showPackageDetails() {
    this.setState({
      packagedetails: true
    });
  }

  closepackagedetails() {
    this.setState({
      packagedetails: false
    });
  }

  closeModalDietForm() {
    this.props.closeservice("");

    this.showpayment();
  }
  showpayment() {
    this.setState({
      showpayment: true
    });
  }

  toggleButton(index) {
    let toggleState = this.state.dropButton;
    let show = {
      ...this.state.dropButton,
      [index]: toggleState[index] ? !toggleState[index] : true
    };
    this.setState({
      dropButton: show
    });

    this.props.diet_plan(null);
  }
  componentDidMount() {
    let toggleArray = this.state.dropButton;
    DietProducts.map((person, index) => (toggleArray[index] = false));
    this.setState({ dropButton: toggleArray });

    if (this.props.User.typeofdiet) {
      let temp = this.state.dropButton;
      temp[this.props.User.typeofdiet] = true;
      this.setState({
        dropButton: temp
      });
    }
  }

  transactionstart() {
    this.setState({
      loading: true
    });
    let yoga = {};

    yoga = Object.assign(this.props.User);

    var user = firebase.auth().currentUser;

    var ref = firebase
      .database()
      .ref("users")
      .child(user.uid)
      .child("dietPlan")
      .child(this.props.User.TransactionID);
    ref.set(yoga).then(() => {
      this.setState({
        loading: false,
        acknowledgementform: true
      });
    });
  }

  closeacknowledgementform() {
    this.setState({
      acknowledgementform: false,
      showpayment: false
    });
    this.props.TrainerService("");
    this.props.paymentTransactionId("");
  }

  scrollbyProps = () => {
    if (
      this.props.User.typeofdiet === "0" ||
      this.props.User.typeofdiet === "2"
    ) {
      window.scrollTo(0, 0);
    } else if (
      this.props.User.typeofdiet === "3" ||
      this.props.User.typeofdiet === "4" ||
      this.props.User.typeofdiet === "5" ||
      this.props.User.typeofdiet === "6"
    ) {
      window.scrollTo(0, 400);
    } else if (this.props.User.typeofdiet === "7") {
      window.scrollTo(0, 500);
    } else if (this.props.User.typeofdiet === "8") {
      window.scrollTo(0, 800);
    }
  };

  componentDidUpdate() {
    this.scrollbyProps();
  }

  closePaymentModal() {
    this.setState({
      closepayment: true,
      showpayment: false
    });
  }
  closeFailureTransaction() {
    this.setState({
      closepayment: false
    });
    this.props.TrainerService("");
    this.props.paymentTransactionId("");
  }
  render() {
    console.log(this.state.showpayment, "example");
    return (
      <div className="gym-background background-watermark">
        <Header />
        <h2 className="shady_header">
          <strong className="iconsheading">
            Diet Plans to help you stay fit !{" "}
          </strong>
        </h2>
        <div className="howitworks">
          <div className="enroll-now-container fitnesscontainer ">
            <ul>
              <strong>How it works</strong>
              <li>Pick your service</li>
              <li>Fill the simple body assessment form</li>
              <li>Choose the duration plan (1/3 Months plan)</li>
              <li>Make payment and sit back </li>
              <li>
                Let our experts work on your diet plan and send it to you within
                24 hours.
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <div className="product-container col-sm-6 mq_width">
            {DietProducts.map((person, index) => (
              <div className="enroll-now-container col-sm-12 col-xs-12 col-md-12 col-xl-12 col-lg-12 productjsoncontainer">
                <Accordion style={{ width: "100%" }}>
                  <Accordion.Toggle
                    eventKey={index}
                    // eventKey={this.props.diet_type===person.content}
                    className="container-row"
                    style={{ outline: 0, width: "100%" }}
                    onClick={() =>
                      this.state.dropButton === index
                        ? this.toggleButton(null)
                        : this.toggleButton(index)
                    }
                  >
                    <img
                      src={require("../../../assests/diet/" + person.image)}
                      style={{ width: "10%", height: "10%" }}
                    />
                    <div
                      className="container"
                      style={{
                        alignItems: "flex-start",
                        textAlign: "left",
                        fontSize: "14px"
                      }}
                    >
                      <div className="">
                        <strong style={{ color: "rgb(70,77,99)" }}>
                          {person.content}
                        </strong>
                      </div>
                      <div
                        className="container-row"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="spaceoldnewprices">
                          <span style={{ textDecoration: "line-through" }}>
                            Rs. {person.oldPrice}
                          </span>
                          <strong className="new_price">
                            &nbsp; Rs. {person.newPrice}
                          </strong>
                        </div>

                        {person.description ? (
                          <span>
                            <span className="dottinproductinfo_toggle">
                              {this.state.dropButton[index] === true ? (
                                <i
                                  className="fa fa-chevron-up"
                                  onClick={
                                    this.props.diet_type
                                      ? this.props.reset_diet_type()
                                      : null
                                  }
                                />
                              ) : (
                                <i className="fa fa-chevron-down" />
                              )}{" "}
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    in={this.state.dropButton[index]}
                    eventKey={index}
                  >
                    <Card.Body>{person.description}</Card.Body>
                  </Accordion.Collapse>
                  {/* :null} */}
                </Accordion>

                {/* {console.log(index)}
                <Button style={{ width: "100%" }}
                 
                  aria-controls="example-collapse-text"
                  aria-expanded={index}
                >
                  {person.content}
                </Button> */}
                {/* <span>
                  <span className="dottinproductinfo_toggle"  >
                    {this.state.dropButton[index] === true ? (
                      <i className="fa fa-chevron-up"/>
                    ) : (
                      <i className="fa fa-chevron-down" />
                    )}{" "}
                  </span>
                </span> */}
                {/* <Collapse
                  in={
                    this.state.dropButton[index] === false||
                    this.props.diet_type === index.toString()
                  }
                  
                >
                  <div id={index}>{person.description}</div>
                </Collapse> */}
                <div>
                  <span
                    className="dottinproductinfo"
                    onClick={() => {
                      if (firebase.auth().currentUser) {
                        this.props.getamount(person.newPrice);
                        this.props.getplan(person.content);
                        this.props.getdescription(person.description);
                        this.props.typeofserivicing("DIETFORM");
                        this.showPackageDetails();
                        // this.showpayment(true);
                      } else {
                        this.props.history.push("/login");
                        this.props.getamount(person.newPrice);
                        this.props.getplan(person.content);
                        this.props.typeofserivicing("DIETFORM");
                      }
                    }}
                  >
                    <i className="fa fa-arrow-right arrowSize"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.packagedetails}
          onHide={() => this.closepackagedetails()}
        >
          <Modal.Header closeButton className="PackageDetails_Header">
            <h5>Diet Plan</h5>
          </Modal.Header>
          <PackageDetails closepackage={() => this.closepackagedetails()} />
        </Modal>

        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.props.formType === "DIETFORM" && this.props.User.showmodal}
          scrollable={true}
          onHide={() => this.closeModalDietForm()}
        >
          <Modal.Header className="marginHeaderDiet">
            <h4>
              <br />
              <strong>Help us know your body better</strong>
            </h4>
            <img
              src={require("./../../../assests/confused_lady.png")}
              style={{ width: "15%" }}
              alt="asset1"
            />
          </Modal.Header>
          <YogaForm close={() => this.closeModalDietForm()} />
        </Modal>
        {this.state.showpayment ? (
          <Payment
            refToParent={() => this.showpayment()}
            transactionoccurs={() => this.transactionstart()}
            refToParent={() => this.closePaymentModal()}
          />
        ) : null}
        {this.state.loading ? <CustomSpinner spinnerVal={true} /> : null}
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
        {this.state.loading ? (
          <CustomSpinner
            spinnerVal={true}
            val="Creating Your Profile ! It may take a while "
          />
        ) : null}

        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.closepayment}
          onHide={() => this.closeFailureTransaction()}
          className="enroll-now-container-diet"
          style={{
            background: "rgba(0,0,0,.03",
            padding: "40px 20px"
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <TransactionFailure
            hideFailure={() => this.closeFailureTransaction()}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { User: state.dietPlan, formType: state.serviceState.formType };
};

const mapDispatchToProps = dispatch => {
  return {
    TrainerService: trainerservice => {
      dispatch(dietplan(trainerservice));
    },
    closeservice: plan => {
      dispatch(ServiceforForm(plan));
    },
    paymentTransactionId: paymentid => {
      dispatch(PaymentTransactionDietPlans(paymentid));
    },
    getplan: plan => {
      dispatch(FinalPlan(plan));
    },
    typeofserivicing: services => {
      dispatch(ServiceforForm(services));
    },
    getamount: amount => {
      dispatch(TotalAmount(amount));
    },
    getdescription: description => {
      dispatch(Description(description));
    },
    diet_plan: typeofdiet => {
      dispatch(type_of_diet(typeofdiet));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Productinfo)
);
