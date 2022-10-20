import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "reactstrap";
import "../../css/LoginModal.css";
import "../../css/toastify.css";
import { functions_for_users } from "../../function_constant";
import CustomSpinner from "../Custom/spinner";
import { toastConfig } from "../Custom/ToastConfig";
import {
  createLoggedUser,
  createRegisterUser,
  storeUserLoginInfo,
  userLoginDetails,
} from "./../../actions/index";
import { firebase } from "./../firebase";

class Signin extends Component {
  constructor(props, { match }) {
    super(props, { match });
    this.state = {
      isUser: false,
      isTrainer: false,
      isAdmin: false,
      email: "",
      password: "",
      res: "",
      emailError: "",
      passwordError: "",
      loading: false,
      uid: "",
      isSignUpCompleted: false,
    };
    this.login = this.login.bind(this);
  }

  handleInputChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    });
  }

  async login(event) {
    let self = this;

    await firebase
      .auth()
      .signInWithEmailAndPassword(self.state.email, self.state.password)
      .then(function () {
        self.postDatatrail(firebase.auth().currentUser);
      })
      .catch((error) => {
        toast(error.message, toastConfig);
      });
  }

  postDatatrail(user) {
    this.setState({
      loading: true,
    });
    this.postData(functions_for_users.typeOfUser, { uid: user.uid }).then(
      (data) => {
        console.log(data);
        switch (data.result) {
          case "User": {
            firebase
              .database()
              .ref("users")
              .child(user.uid)
              .child("profile")
              .once("value", (snapshot) => {
                let userdetails = this.state;
                userdetails = snapshot.val();
                this.props.UserDetail(userdetails);
              });
            if (
              this.props.service ||
              (this.props.User && this.props.User.userpage)
            ) {
              this.setState({
                loading: false,
              });
              switch (this.props.service || this.props.User.userpage) {
                case "DIET":
                  return this.props.history.push("/diet");
                case "FITNESS":
                  return this.props.history.push("/booksession");
                case "YOGA":
                  return this.props.history.push("/booksession");
                case "Dashboard":
                  return this.props.history.push("/user/userDashboard");
              }
            } else {
              this.props.history.goBack();
            }
            return 1;
          }

          case "Admin": {
            firebase
              .database()
              .ref("admin")
              .child(user.uid)
              .child("profile")
              .once("value", (snapshot) => {
                let userdetails = this.state;
                userdetails = snapshot.val();
                this.props.UserDetail(userdetails);
              });
            this.props.history.push({
              pathname: "/admin/adminDashboard",
              params: { username: "Admin" },
            });
          }
        }
      }
    );
  }

  postData(url = ``, data) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => resolve(response.json()))
        .catch((err) => {
          toast(err.message, toastConfig);
          reject(err);
        }); // parses response to JSON
    });
  }
  reset_password = () => {
    this.setState({
      reset: true,
      password: "",
    });
  };
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div className="modalcontainer ">
              <ValidatorForm onSubmit={() => this.login()}>
                <div>
                  <div className="form-group">
                    <TextValidator
                      label="Email *"
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={["Valid Email is required"]}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <TextValidator
                      label="Password *"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      validators={["required"]}
                      errorMessages={["Password is required"]}
                      value={this.state.password}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                </div>

                <center className="bottom">
                  <button type="submit" className="login_signup_button ">
                    Login
                  </button>
                  {/* {this.state.reset === true ?
                   <button type="submit" className="login_signup_button ">
                    "Send Rest Password Link"
                 </button> : null} */}
                </center>
              </ValidatorForm>
            </div>
          </Col>
        </Row>

        <ToastContainer transition={Flip} />
        {this.state.loading ? <CustomSpinner spinnerVal={true} /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { User: state.userDetail, service: state.serviceState.services };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (reguser) => {
      dispatch(createRegisterUser(reguser));
    },
    getUserLoginState: (User) => {
      dispatch(storeUserLoginInfo(User));
    },
    createdUser: (username) => {
      dispatch(createLoggedUser(username));
    },
    UserDetail: (userlogindetails) => {
      dispatch(userLoginDetails(userlogindetails));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
