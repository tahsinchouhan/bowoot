import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../css/Howitcomponent.css";
import { firebase } from "../firebase";

class HowitWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Proceed = () => {
    if (firebase.auth().currentUser) {
      this.props.history.push("/bookSession");
    } else {
      this.props.history.push("/login");
    }
  };
  Proceed1 = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="fitnesscontainer" style={{ minWidth: "250px" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "14px",
            lineHeight: "1.5rem"
          }}
        >
          <li style={{ textAlign: "left" }}>
            Genuine Customer! Book Trial Session @49/- (Refundable*)
          </li>
          <li style={{ textAlign: "left" }}>
            Pay Rs. 49/- now ! And this will be refunded to you while you make
            payment for the selected service package. By paying this nominal
            amount you are assuring us that you are a genuine and valuable
            customer to us.
          </li>
          <li style={{ textAlign: "left" }}>Choose the service</li>
          <li style={{ textAlign: "left" }}>Make payment and sit back </li>

          <li style={{ textAlign: "left" }}>
            We will send our best professional. If you like the session go ahead
            with 12 sessions / 4weeks suitable package.
          </li>
        </ul>
        <div className="buttonalignment">
          <button
            className="howitcomponent_button "
            onClick={() => this.props.closehowitworks()}
          >
            cancel
          </button>
          <button
            className="howitcomponent_button "
            onClick={() => this.Proceed()}
          >
            proceed
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    service: state.serviceState.services
  };
};

export default withRouter(connect(mapStateToProps, null)(HowitWorks));
