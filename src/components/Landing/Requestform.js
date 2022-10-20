import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "../../css/corporateplan.css";
import { connect } from "react-redux";
import { firebase } from "./../firebase";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import { Media, Modal } from "react-bootstrap";

class Requestform extends React.Component {
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
      var ref = firebase.database().ref("requestform");
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
      email: ""
    });
  };

  render() {
    return (
      <Modal
        dialogClassName="custom-map-modal col-sm-6"
        show={this.props.show}
        onHide={() => this.props.onHide()}
        size="sm"
        animation={true}
        backdrop={true}
      >
        <Modal.Header
          closeButton
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            background: "ghostWhite",
            borderRadius: "0px 20px 0 0"
          }}
        >
          <h5>Request Form</h5>
        </Modal.Header>
        <div className="corporate_background">
          <div className="corporate-container">
            <ValidatorForm onSubmit={() => this.handleClick()}>
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
                  label="How can we help you *"
                  type="text"
                  placeholder="Requirement"
                  className="form-control"
                  name="requirement"
                  onChange={this.handleInputChange}
                  value={this.state.requirement}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  height="40px"
                />
              </div>
              <div
                className="message_container col-sm-8"
                style={{ marginBottom: "4px" }}
              >
                Please leave a message and we will get back to you within 24
                hours !
              </div>
              <Modal.Footer className="requestFooter">
                <button type="submit" className="buttonsubmit">
                  Submit
                </button>
              </Modal.Footer>
            </ValidatorForm>
          </div>
        </div>
        <ToastContainer transition={Flip} style={{ top: "0%" }} />
      </Modal>
    );
  }
}

export default withRouter(connect()(Requestform));
