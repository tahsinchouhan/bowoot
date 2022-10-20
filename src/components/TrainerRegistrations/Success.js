import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createTrainerProfDetails } from "../../actions";

class Success extends Component {
  state = {};

  onSubmit() {
    this.props.onAddPost("");
    this.props.history.replace("/");
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
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
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
            Congratulations ! Your profile has been created. <br />
          </div>
          <div
            style={{
              color: "rgb(34, 41, 91)",
              fontWeight: 400,
              lineHeight: "1.2rem",
              margin: "30px"
            }}
          >
            <strong>Note: </strong>Please wait for 24 hours for profile
            verification and Download Bowoot app to keep track of all your
            activities.
          </div>
          <a onClick={() => this.onSubmit()}>
            <div className="enroll_button">Done</div>
          </a>
        </strong>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: prof => {
      dispatch(createTrainerProfDetails(prof));
    }
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Success));
