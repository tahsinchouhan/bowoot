import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../css/LoginModal.css";
import Signin from "./Signin";
import Signup from "./Signup";
import { firebase } from "../firebase";
import ResetPassword from "./ResetPassword";

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "login"
    };
  }
  componentDidMount() {
    // setTimeout(function() {
    //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //     "recaptcha-container",
    //     {
    //       size: "hidden"
    //       // callback: function(response) {
    //       //   console.log("success", response);
    //       // },
    //       // "expired-callback": function() {
    //       //   console.log("expired-callback");
    //       // }
    //     }
    //   );
    // }, 2000);
  }

  onLoginWithFb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        alert(user, token);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  onLoginWithGoogle() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    // firebase
    //   .auth()
    //   .signInWithPhoneNumber("+919035381925", window.recaptchaVerifier)
    //   .then(function(confirmationResult) {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //   })
    //   .catch(function(error) {
    //     // Error; SMS not sent
    //     // ...
    //   });
  }

  componentWillUpdate() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("logged in", user);
    });
  }

  render() {
    return (
      <div>
        <h2 className="shady_header">
          <strong className="iconsheading">
            {this.state.activeTab === "login" ? "Login" : "Sign Up"} To Get Fit{" "}
          </strong>
        </h2>
        <div className="login">
          <div className="col-sm-12">
            <div className="container-row">
              <div className="col-sm-12 col-md-6 col-lg-4 modal-container ">
                {this.state.activeTab === "login" ? <Signin /> : null}
                {this.state.activeTab === "signup" ? <Signup /> : null}
                {this.state.activeTab === "reset_password" ? (
                  <ResetPassword />
                ) : null}

                {this.state.activeTab === "login" ? (
                  <div className="container-row">
                    <div
                      className="loginfacebook"
                      onClick={() => this.onLoginWithFb()}
                    >
                      <a href="/">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </div>

                    <div className="OrloginWith">
                      Or{" "}
                      {this.state.activeTab === "login" ? "Login " : "Sign Up "}{" "}
                      with
                    </div>

                    <div
                      className="OrloginWith"
                      onClick={() => {
                        this.onLoginWithGoogle();
                      }}
                    >
                      <i className="fa fa-google"></i>
                    </div>
                  </div>
                ) : null}
                <br />
                {this.state.activeTab === "login" ? (
                  <div>
                    <center>
                      Not a member !{" "}
                      <span
                        style={{
                          color: "#27a009",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          this.setState({ activeTab: "signup" });
                        }}
                      >
                        Sign Up{" "}
                      </span>
                      Now
                    </center>
                    <center>
                      <span
                        style={{
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                        onClick={() =>
                          this.setState({ activeTab: "reset_password" })
                        }
                      >
                        Password Reset ?
                      </span>
                    </center>
                  </div>
                ) : (
                  <center>
                    Existing a member !{" "}
                    <span
                      style={{
                        color: "#27a009",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        this.setState({ activeTab: "login" });
                      }}
                    >
                      Login{" "}
                    </span>
                    Now
                  </center>
                )}
              </div>
              <div className="col-sm-6">
                <img
                  src={require("../../assests/yoga_land.svg")}
                  className="login_background"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="recaptcha-container" />
      </div>
    );
  }
}

export default withRouter(connect()(LoginSignup));
