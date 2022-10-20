import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { resetDietPlan } from "../../../actions";

class TransactionFailure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closetransactionfailure() {
    this.props.hideFailure();
    this.props.clearDietPlan();
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
          <i
            class="fa fa-times"
            aria-hidden="true"
            style={{ color: "red" }}
          ></i>
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
            Your Transaction is failed Please try again
            <br />
          </div>
        </strong>
        <a onClick={() => this.closetransactionfailure()}>
          <div className="enroll_button">Done</div>
        </a>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    clearDietPlan: payment => {
      dispatch(resetDietPlan(null));
    }
  };
};
export default withRouter(
  connect(null, mapDispatchToProps)(TransactionFailure)
);
