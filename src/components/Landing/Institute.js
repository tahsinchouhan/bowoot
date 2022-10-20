import React from "react";
import Header from "../Header";
import "../../css/institute.css";
import { connect } from "react-redux";

import { TotalAmount } from "../../actions/index";
import InstituteJson from "./InstitiuteJson";
import InstituteJson1 from "./InstituteJson1";
import InstituteJson2 from "./InstituteJson2";
import { firebase } from ".././firebase";

import { Modal } from "react-bootstrap";
import Payment from "././Payment";
import Acknowledgement from "./Diet/Acknowledgement";
import TransactionFailure from "./Diet/TransactionFailure";

class Institute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showpayment(paymentstate) {
    this.setState({
      show: paymentstate
    });
  }

  passingdiet() {
    this.props.passingservice("INSTITUTE");
  }

  transactionstart() {
    this.setState({
      acknowledgementform: true,
      show: false
    });
  }

  closeacknowledgementform() {
    this.setState({
      acknowledgementform: false
    });
  }

  closePaymentModal() {
    this.setState({
      closepayment: true,
      show: false
    });
  }
  closeFailureTransaction() {
    this.setState({
      closepayment: false
    });
  }
  render() {
    return (
      <div className="gym-background background-watermark">
        <Header />
        <h2 className="shady_header">
          <strong className="iconsheading">
            Become a Personal trainer or Dietitian, Start your fitness carrier
            today
          </strong>
        </h2>

        <div className="institutecard ">
          {InstituteJson.map((person, index) => (
            <div className=" container institute-modal ">
              <div className="alignheaderfitness">
                <strong className="headerfontsize">{person.header}</strong>

                <div className="pricealignment">
                  <strong>{person.duration}</strong>
                  <strong className="marginbwprice">Rs.{person.Price}</strong>
                </div>
              </div>

              <div className="descriptionaligment">
                <div className="specialistfellowprogram">
                  <strong>{person.subheader1}</strong>
                  <div>{person.description1}</div>
                  <br />
                  <strong>{person.subheader2}</strong>
                  <div>{person.description2}</div>
                  <br />
                  <strong>{person.subheader3}</strong>
                  <div>{person.description3}</div>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <a
                  className="enroll_button"
                  onClick={() => {
                    if (firebase.auth().currentUser) {
                      this.showpayment(true);
                      this.props.getamount(person.Price);
                    } else {
                      this.props.history.push("/login");
                    }
                  }}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}

          {InstituteJson1.map((person, index) => (
            <div className="container institute-modal">
              <div className="alignheaderfitness">
                <strong className="headerfontsize">{person.header}</strong>

                <div className="pricealignment">
                  <strong>{person.duration}</strong>
                  <strong className="marginbwprice">Rs.{person.Price}</strong>
                </div>
              </div>

              <div className="descriptionaligment1">
                <div className="specialistfellowprogram">
                  <div>{person.subheader1}</div>
                  <div>{person.description1}</div>
                  <br />
                  <div>{person.subheader2}</div>
                  <div>{person.description2}</div>
                  <br />
                  <div>{person.subheader3}</div>
                  <div>{person.description3}</div>
                  <br />
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <a
                  className="enroll_button"
                  onClick={() => {
                    if (firebase.auth().currentUser) {
                      this.showpayment(true);
                      this.props.getamount(person.Price);
                    } else {
                      this.props.history.push("/login");
                    }
                  }}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}

          {InstituteJson2.map((person, index) => (
            <div className="container institute-modal">
              <div className="alignheaderfitness">
                <strong className="headerfontsize">{person.header}</strong>

                <div className="pricealignment">
                  <strong>{person.duration}</strong>
                  <strong className="marginbwprice">Rs.{person.Price}</strong>
                </div>
              </div>

              <div className="descriptionaligment2">
                <div className="specialistfellowprogram">
                  <div>{person.subheader1}</div>
                  <div>{person.description1}</div>
                  <br />
                  <div>{person.subheader2}</div>
                  <div>{person.description2}</div>
                  <br />
                  <div>{person.subheader3}</div>
                  <div>{person.description3}</div>
                  <br />
                  <div>{person.subheader4}</div>
                  <div>{person.description3}</div>
                  <br />
                  <div>{person.subheader5}</div>
                  <div>{person.description3}</div>
                  <br />
                  <div>{person.subheader6}</div>
                  <div>{person.description3}</div>
                  <br />
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <a
                  className="enroll_button"
                  onClick={() => {
                    if (firebase.auth().currentUser) {
                      this.showpayment(true);
                      this.props.getamount(person.Price);
                    } else {
                      this.props.history.push("/login");
                    }
                  }}
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>
        {this.state.show ? (
          <Payment
            refToParent={() => this.showpayment()}
            transactionoccurs={() => this.transactionstart()}
            refToParent={() => this.closePaymentModal()}
          />
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

const mapDispatchToProps = dispatch => {
  return {
    getamount: amount => {
      dispatch(TotalAmount(amount));
    }
  };
};
export default connect(null, mapDispatchToProps)(Institute);
