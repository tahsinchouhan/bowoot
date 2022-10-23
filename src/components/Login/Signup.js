import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import { Col, Row } from "reactstrap";
import { createRegisterUser } from "../../actions";
import "../../css/LoginModal.css";
import { functions_for_users } from "../../function_constant";
import { toastConfig } from "../Custom/ToastConfig";
import { firebase } from "../firebase/index";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      phoneNumber: "+91",
      email: "",
      password: "",
    };
    this.postDatatrail = this.postDatatrail.bind(this);
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    let add,
      self = this;
    if (
      this.state.name.trim() &&
      this.state.gender.trim() &&
      this.state.phoneNumber.trim() &&
      this.state.email.trim() &&
      this.state.password
    ) {
      add = this.state;
      this.props.onAddPost(add);
      this.postDatatrail();
    }
  };

  postDatatrail() {
    let add = this.state,
      self = this;
    add.token = "isUser";
    this.postData(functions_for_users.creatNewUser, add)
      .then((data) => {
        if (data.uid) {
          delete add.password;
          delete add.token;
          var ref = firebase
            .database()
            .ref("/users/" + data.uid)
            .child("profile");
          ref.set(add);
          self.props.history.replace("/user/userDashboard");
          self.handleReset();
        } else {
          toast(data.error.message, toastConfig);
        }
      })
      .catch((error) => {
        toast(error.message, toastConfig);
      });
  }

  postData(url = ``, data) {
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip",
          "Access-Control-Allow-Credentials": true,
          cors: "no-cors",
        },
        body: JSON.stringify(data),
      })
        .then((response) => resolve(response.json()))
        .catch((err) => {
          toast(err.code, err.message, toastConfig);
          reject(err);
        });
    });
  }
  handleReset = () => {
    this.setState({
      name: "",
      gender: "",
      phoneNumber: "",
      password: "",
      email: "",
    });
  };

  render() {
    console.log("dsjh");
    return (
      <div>
        <Row>
          <Col sm="12">
            <div className="modalcontainer">
              <ValidatorForm
                onSubmit={() => this.handleClick()}
                className="login"
              >
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Name *"
                      type="text"
                      placeholder="Name *"
                      className="form-control"
                      name="name"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                      validators={["required"]}
                      errorMessages={["Name is required"]}
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="form-group">
                    <div className="container-row">
                      <div className="book_session_radio">
                        <input
                          id="radio-1"
                          name="gender"
                          type="radio"
                          value="Male"
                          checked={this.state.gender === "Male"}
                          onChange={this.handleInputChange}
                          validators={["required", "isEmail"]}
                          errorMessages={["Valid Email is required"]}
                        />
                        <label for="radio-1" className="book_radio">
                          Male
                        </label>
                      </div>
                      <div className="book_session_radio">
                        <input
                          id="radio-2"
                          name="gender"
                          type="radio"
                          value="Female"
                          checked={this.state.gender === "Female"}
                          onChange={this.handleInputChange}
                          validators={["required", "isEmail"]}
                          errorMessages={["Valid Email is required"]}
                        />
                        <label for="radio-2" className="book_radio">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Phone Number *"
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                      name="phoneNumber"
                      onChange={this.handleInputChange}
                      value={this.state.phoneNumber}
                      validators={["required"]}
                      errorMessages={[
                        "Please enter a valid phone number along with code",
                      ]}
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Email *"
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={["Valid Email is required"]}
                    />
                  </div>
                  <div className="input">
                    <div className="form-group">
                      <TextValidator
                        label="Password *"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        validators={["required"]}
                        errorMessages={[
                          "Please enter a password with 6 or more characters with any 0-9 number included ",
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-2"></div>
                  </div>

                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-2"></div>
                    </div>
                    <center className="bottom">
                      <button type="submit" className="login_signup_button ">
                        Sign Up
                      </button>
                    </center>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </Col>
        </Row>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = (State) => {
  return { reguser: State.reguser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (reguser) => {
      dispatch(createRegisterUser(reguser));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
