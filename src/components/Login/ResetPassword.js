import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { firebase } from "./../firebase";
import { Row, Col } from "reactstrap";
import "../../css/LoginModal.css";
import "../../css/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast, Flip } from "react-toastify";
import CustomSpinner from "../Custom/spinner";

class ResetPassword extends Component {
  constructor(props, { match }) {
    super(props, { match });
    this.state = {
      email: "",
      loading: false,
      isSignUpCompleted: false
    };
  }

  handleInputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  reset_password=()=>{
    this.setState({
      reset:true,
    })
    firebase.auth().sendPasswordResetEmail(this.state.email);
  }
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div className="modalcontainer ">
              <ValidatorForm>
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
                
                <center className="bottom">
                <button type="submit" onClick={()=>this.reset_password()} className="login_signup_button ">
                Send Rest Password Link
                  </button>
                </center>
              </ValidatorForm>
            </div>
          </Col>
        </Row>

        <ToastContainer transition={Flip} />
        {this.state.loading ? (
          <CustomSpinner
            spinnerVal={true}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter((ResetPassword));
