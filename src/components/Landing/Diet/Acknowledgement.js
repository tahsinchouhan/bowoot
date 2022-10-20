import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PaymentTransactionDietPlans } from "../../../actions";
import { resetDietPlan } from "../../../actions";
class Acknowledgement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: props.User.TransactionID
    };
  }

  finistDietProcess() {
    this.props.clearDietPlan();
    this.props.closeParentAck();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          padding: "20px",
          margin: "20px",
          flexDirection: "column",
          color: "#080808"
        }}
      >
        <center>
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </center>
        <strong
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "10px"
          }}
        >
          <div style={{ color: "#464d63" }}>
            Your Transaction was Successful !<br />
            Your Transaction Id is :
            <span
              style={{
                fontWeight: "normal",
                fontFamily: "sans-serif",
                marginLeft: "4px"
              }}
            >
              {this.state.payment}
            </span>
            <br />
          </div>
          <div
            style={{
              color: "rgb(34, 41, 91)",
              fontWeight: 400,
              lineHeight: "1.2rem",
              margin: "30px"
            }}
          >
            <strong>Note: </strong>Kindly wait for 24 hours and our Nutrition
            specialist will send your diet plan based on data provided by you !
          </div>
          <a onClick={() => this.finistDietProcess()}>
            <div className="enroll_button">Done</div>
          </a>
        </strong>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("the state of payment id", state);
  return {
    User: state.dietPlan
  };
};
const mapDispatchToProps = dispatch => {
  return {
    paymentTransactionId: paymentid => {
      dispatch(PaymentTransactionDietPlans(paymentid));
    },
    clearDietPlan: payment => {
      dispatch(resetDietPlan(null));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Acknowledgement)
);
