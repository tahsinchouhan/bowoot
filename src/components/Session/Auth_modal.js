import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      open: false,
      showPassword: false,
      email: "",
      password: "",
      showLogin: true,
      userName: "",
      mobileNo: "",
      otpCode: "",
      showSnackbar: false,
      showPhoneNoLoader: false,
      showConfirmationLoader: false,
      showButtonLoader: false,
      showOTPPrompt: false
    };
    this.state = this.defaultState;
  }

  onModalClose() {
    this.props.onClose();
    this.setState(this.defaultState);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
    });
  }

  onPhoneAuth(type) {
    this.setState({ showButtonLoader: true });
    if (type == "LOGIN") {
      this.onLoginWithPhone();
    } else {
      this.onSignUpWithPhone();
    }
  }

  resendSMS(type) {
    if (type == "SIGNUP") {
      this.onSignUpWithPhone();
    } else {
      this.onLoginWithPhone();
    }
  }

  onLoginWithPhone() {
    this.setState({ showPhoneNoLoader: true });
    let phoneNumber = this.state.mobileNo;
    firebase
      .auth()
      .signInWithPhoneNumber("+91" + phoneNumber, window.recaptchaVerifier)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
        this.setState({
          showOTPPrompt: true,
          showPhoneNoLoader: false,
          showButtonLoader: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async onOTPConfirm(type) {
    try {
      let code = (this.state.otpCode || "").trim();
      this.setState({ showConfirmationLoader: true });
      if (this.confirmationResult) {
        var credential = firebase.auth.PhoneAuthProvider.credential(
          this.confirmationResult.verificationId,
          code
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(result => {
            this.onSignUpComplete(result, type);
          })
          .catch(err => {
            console.log(err);
            if (err.code == "auth/invalid-verification-code") {
              console.log(err);
            }
            this.setState({ showConfirmationLoader: false });
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onLoginWithGoogle(type) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = "en";
    provider.setCustomParameters({
      login_hint: "user@example.com",
      prompt: "select_account"
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  renderPhoneForm(classes, type) {
    let content;
    if (this.state.showPhoneNoLoader) {
      content = (
        <div className={classes.otpLoaderBlock}>
          <CircularProgress className={classes.progress} />
          <div className={classes.otpLoaderText}> Sending Otp... </div>
        </div>
      );
    } else if (this.state.showConfirmationLoader) {
      content = (
        <div className={classes.otpLoaderBlock}>
          <CircularProgress className={classes.progress} />
          <div className={classes.otpLoaderText}>
            {" "}
            {type == "SIGNUP" ? "Regestering" : "Logging In"}...{" "}
          </div>
        </div>
      );
    } else if (this.state.showOTPPrompt) {
      content = (
        <div>
          <ValidatorForm
            ref="form1"
            onSubmit={this.onOTPConfirm.bind(this, type)}
            onError={errors => {}}
            instantValidate={false}
          >
            <div className={classes.textFieldStyle}>
              <TextValidator
                onChange={event => {
                  this.handleChange("otpCode", event);
                }}
                label="OTP Code"
                margin="dense"
                type="number"
                value={this.state.otpCode}
                variant="outlined"
                validators={[
                  "required",
                  "minStringLength:6",
                  "maxStringLength:6"
                ]}
                errorMessages={[
                  "OTP is required",
                  "OTP should have 6 digit",
                  "OTP should have 6 digit"
                ]}
              />
            </div>
            <div
              className={classes.textFieldStyle}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                color="primary"
                type="submit"
                variant="outlined"
                className={classes.button}
                style={{ fontWeight: "bold" }}
              >
                Confirm OTP
              </Button>
            </div>
            <div
              className={classes.resendLink}
              onClick={() => {
                this.resendSMS(type);
              }}
            >
              Resend SMS
            </div>
          </ValidatorForm>
        </div>
      );
    } else {
      content = (
        <div>
          <ValidatorForm
            ref="form1"
            onSubmit={this.onPhoneAuth.bind(this, type)}
            onError={errors => {}}
            instantValidate={false}
          >
            <div className={classes.textFieldStyle}>
              <TextValidator
                onChange={event => {
                  this.handleChange("mobileNo", event);
                }}
                label="Phone Number"
                margin="dense"
                size={10}
                type="number"
                value={this.state.mobileNo}
                validators={[
                  "required",
                  "minStringLength:10",
                  "maxStringLength:10"
                ]}
                errorMessages={[
                  "Phone number is required",
                  "Phone number is invalid",
                  "Phone number is invalid"
                ]}
                variant="outlined"
              />
            </div>
            <div
              className={classes.textFieldStyle}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                {this.state.showButtonLoader ? (
                  <CircularProgress
                    style={{ color: "white", width: 30, height: 30 }}
                  />
                ) : type == "LOGIN" ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </ValidatorForm>
        </div>
      );
    }
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px"
        }}
      >
        {content}
        <div className={classes.googleButtonContainer}>
          <ButtonBase
            className={classes.googleButton}
            onClick={() => this.onLoginWithGoogle.bind(this, "LOGIN")}
          >
            <div className={classes.googleButtonText}>
              {" "}
              {type == "LOGIN" ? "Login" : "Sign Up"} With Google{" "}
            </div>
          </ButtonBase>
        </div>
      </div>
    );
  }

  renderUiAuth(classes) {
    if (this.state.showLogin === false) {
      return (
        <div className={""}>
          <div className={classes.loginType}> Create Account </div>
          <div style={this.getModalStyle()}>
            <div className={classes.loginText}>
              <div>Login</div>
            </div>
            <div className={classes.loginForm}>
              {this.renderPhoneForm(classes, "SIGNUP")}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={""}>
          <div className={classes.loginType}>Login</div>
          <div style={this.getModalStyle()}>
            <div className={classes.loginForm}>
              {this.renderPhoneForm(classes, "LOGIN")}
            </div>
            <div className={classes.loginText}>
              <div>Login</div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderFooterSection(classes) {
    if (this.state.showLogin) {
      return (
        <div
          style={{
            padding: "20px 15px 15px 15px",
            marginTop: 10,
            borderTop: "2px dashed #ddd"
          }}
        >
          <div className={classes.footerSection}>
            Don't have an account?
            <span
              className={classes.footerLink}
              onClick={() => {
                this.setState({ showLogin: false, otpCode: "", mobileNo: "" });
              }}
            >
              Create Account
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            padding: "20px 15px 15px 15px",
            marginTop: 10,
            borderTop: "2px dashed #ddd"
          }}
        >
          <div className={classes.footerSection}>
            Have an account already?
            <span
              className={classes.footerLink}
              onClick={() => {
                this.setState({ showLogin: true, otpCode: "", mobileNo: "" });
              }}
            >
              Login
            </span>
          </div>
        </div>
      );
    }
  }

  getModalStyle() {
    return {
      alignSelf: "center",
      margin: "auto",
      display: "flex",
      flex: 1,
      flexDirection: ""
    };
  }

  handleChange(name, data) {
    this.setState({ [name]: data.target.value });
  }

  toggelUi() {
    this.setState({
      showLogin: !this.state.showLogin,
      otpCode: "",
      mobileNo: ""
    });
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={true}
        BackdropProps={{ classes: "custom-backdrop" }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
        onClose={() => {
          this.onModalClose();
        }}
      >
        <div className={classes.paper}>
          {this.renderUiAuth(classes)}
          {this.renderFooterSection(classes)}
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing(70),
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    outline: "none",
    boxShadow: "0px 0px 30px 1px #8c8c8c",
    borderRadius: 10
  },
  loginText: {
    flex: 0.5,
    display: "flex",
    borderLeftColor: "blue",
    borderLeftWidth: 2,
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  loginForm: {
    flex: 0.6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
  },
  dense: {
    marginTop: 10
  },
  margin: {
    margin: theme.spacing(1)
  },
  textFieldStyle: {
    flex: 1,
    display: "flex"
  },
  button: {
    margin: theme.spacing(1),
    flex: 1
  },
  loginImage: {
    flex: 1,
    display: "flex",
    width: "100%"
  },
  loginType: {
    fontSize: "25px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: 1,
    padding: "20px 10px 0 10px",
    color: "#666"
  },
  modalCloseIcon: {
    top: 12,
    right: 12,
    color: "#444",
    cursor: "pointer",
    fontSize: "28px !important",
    position: "absolute"
  },
  googleButton: {
    boxShadow: "0 0 6px #999",
    padding: "0 5px",
    borderRadius: 4,
    height: 40,
    backgroundColor: "white"
  },
  googleIcon: {
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: "white"
  },
  googleButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  googleButtonText: {
    padding: "0 10px ",
    fontSize: 16,
    color: "#4285f4",
    fontWeight: "bold"
  },
  footerSection: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  footerLink: {
    color: "#4285f4",
    cursor: "pointer",
    padding: "0 10px",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  otpLoaderBlock: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  otpLoaderText: {
    padding: "15px 5px 5px 5px",
    fontWeight: "bold",
    color: "#555"
  },
  resendLink: {
    margin: 10,
    textDecoration: "underline",
    cursor: "pointer",
    color: "blue"
  },
  snackbar: {
    backgroundColor: "#d38400",
    color: "white",
    padding: 10
  },
  snackbarMessage: {
    fontSize: 19,
    fontWeight: "bold",
    padding: "0 15px",
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(AuthModal);
