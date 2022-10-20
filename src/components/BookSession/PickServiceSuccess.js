import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../firebase";
import Payment from "../Landing/Payment";
import { resetBookSession } from "../../actions/index";
export class PickServiceSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      error: false
    }
  }

  handleSubmit = e => {
    this.props.history.replace("/user/userDashboard");
    window.location.reload();
  };

  componentDidUpdate() {
    let user = firebase.auth().currentUser,
      self = this;
    if (this.props.user.TransactionId) {
      var ref = firebase
        .database()
        .ref("userServices")
        .child(user.uid)
        .child(self.props.user.TransactionId);
      ref.set(self.props.user);
    }
  }

  closeModal() {
    this.setState({
      show: false,
      error: true
    })
  }
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  finishProcess() {
    this.props.reset_booksession();
    this.props.history.replace("/");
  }
  render() {
    return (
      <div>
        {this.props.user.TransactionId ? (
          <div>
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
                {this.props.user.TransactionId ? (
                  <span>
                    Your Transaction is Successfull with Transaction ID :{" "}
                    <center style={{ color: "#464d63" }}>
                      <pre>{this.props.user.TransactionId}</pre>
                    </center>
                  </span>
                ) : null}
              </div>

              <div
                style={{
                  color: "rgb(34, 41, 91)",
                  fontWeight: 400,
                  padding: " 12px 40px"
                }}
              >
                <strong>Note: </strong>You will recieve a SMS as soon as a
                Trainer is assigned to you.
              </div>
              <div
                className="enroll_button"
                onClick={() => this.finishProcess()}
              >
                Done
              </div>
            </strong>
            <br />
          </div>
        ) : null}
        {this.state.error ? (
          <div className="form-group container">
            <strong>
              <br />
              Sorry ! Transaction was unsuccessfull ! Kindly try again <br />
            </strong>
            <div className="enroll_button" onClick={() => this.finishProcess()}>
              Done
            </div>
            <br />
          </div>
        ) : null}
        {this.state.show ? (
          <Payment refToParent={() => this.closeModal()} />
        ) : null}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { user: state.bookSession }
}
const mapDispatchToProps = dispatch => {
  return {
    reset_booksession: resetBook => {
      dispatch(resetBookSession({ resetBook }))
    }
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PickServiceSuccess)
)
