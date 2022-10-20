import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "../../css/corporateplan.css";
import { connect } from "react-redux";
import { firebase } from "./../firebase";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";

class Corporateplan extends React.Component {
  state = {
    Name: "",
    company: "",
    requirement: "",
    email: ""
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (
      this.state.Name.trim() &&
      this.state.company.trim() &&
      this.state.requirement.trim() &&
      this.state.email.trim()
    ) {
      var ref = firebase.database().ref("corporateplan");
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
        <h2 className="corporateplanheader">
          <strong className="">Corporate Plan</strong>
        </h2>

        <div className="corporate-container">
          <ValidatorForm onSubmit={() => this.handleClick()}>
            <div className="inputfieldsize">
              <TextValidator
                label="Name *"
                type="text"
                placeholder="Enter Your Name"
                className="form-control"
                name="Name"
                onChange={this.handleInputChange}
                value={this.state.Name}
                validators={["required"]}
                errorMessages={["Name is required"]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                label="Company Name *"
                type="text"
                placeholder="Enter Company Name"
                className="form-control"
                name="company"
                onChange={this.handleInputChange}
                value={this.state.company}
                validators={["required"]}
                errorMessages={["Company name is mandatory"]}
              />
            </div>

            <div className="inputfieldsize">
              <TextValidator
                type="email"
                label="Email *"
                placeholder="Enter email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
                validators={["required", "isEmail"]}
                errorMessages={["Kindly enter valid email-id"]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                label="Requirement"
                type="text"
                placeholder="Enter Requirement *"
                className="form-control"
                name="requirement"
                onChange={this.handleInputChange}
                value={this.state.requirement}
                validators={["required"]}
                errorMessages={["This field is required"]}
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
            <div className="message_container col-sm-6">
              send us your special requirements we will get back to you ASAP.
            </div>
          </ValidatorForm>
        </div>
        <div className="corporate_image" />
        <ToastContainer transition={Flip} style={{ top: "0%" }} />
      </div>
    );
  }
}

export default withRouter(connect()(Corporateplan));
