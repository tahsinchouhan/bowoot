import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "../../css/corporateplan.css";
import { connect } from "react-redux";
import { firebase } from "./../firebase";
import { withRouter } from "react-router-dom";
import { toastConfig } from "../Custom/ToastConfig";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class NatalForm extends React.Component {
  state = {
    Name: "",
    address: "",
    requirement: "",
    email: "",
    show: true
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (
      this.state.Name.trim() &&
      this.state.requirement.trim() &&
      this.state.email.trim()
    ) {
      var ref = firebase.database().ref("natalFormDetails");
      ref.push(this.state);
      if (ref) {
        toast(
          "Your Information in received we will contact you soon!!",
          toastConfig
        );
        setInterval(() => {
          this.props.onHide();
        }, 3000);
      }
    }
  };

  handleReset = () => {
    this.setState({
      Name: "",
      company: "",
      requirement: "",
      email: ""
    });
  };

  render() {
    return (
      <div className="corporate_background">
        <h2 className="natalheading">
          <strong className="">Natal(Pre & Post)</strong>
        </h2>

        <div className="corporate-container">
          <ValidatorForm onSubmit={this.handleClick}>
            <div className="inputfieldsize">
              <TextValidator
                label="Name *"
                type="text"
                placeholder="Enter Your Name"
                className="form-control"
                name="Name"
                validators={["required"]}
                onChange={this.handleInputChange}
                value={this.state.Name}
                errorMessages={["Name is required"]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                type="text"
                label="Address"
                placeholder="Enter Address"
                className="form-control"
                name="address"
                onChange={this.handleInputChange}
                value={this.state.address}
              />
            </div>

            <div className="inputfieldsize">
              <TextValidator
                type="email"
                label="Email *"
                placeholder="Enter email"
                className="form-control"
                name="email"
                validators={["required", "isEmail"]}
                onChange={this.handleInputChange}
                value={this.state.email}
                errorMessages={[
                  "Please enter a valid email id to contact you !"
                ]}
              />
            </div>

            <div className="inputfieldsize">
              <TextValidator
                label="Requirements *"
                type="text"
                placeholder="Enter Requirement *"
                className="form-control"
                name="requirement"
                validators={["required"]}
                onChange={this.handleInputChange}
                value={this.state.requirement}
                errorMessages={["Kindly share your requirements "]}
              />
            </div>
            <div
              className="form-group enroll_main"
              style={{ alignItems: "center" }}
            >
              <button type="submit" className="buttonsubmit">
                Submit
              </button>
            </div>
            <div className="message_container col-sm-8">
              We are going to send our certified fitness experts for the trial
              sessions please discuss your medical conditions with them properly
              before the trail session and plan accordingly.
            </div>
          </ValidatorForm>
        </div>
        <ToastContainer transition={Flip} style={{ top: "0%" }} />
      </div>
    );
  }
}

export default withRouter(connect()(NatalForm));
