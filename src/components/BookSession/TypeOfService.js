import React, { Component } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { connect } from "react-redux";
import { RegisterService } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import "./../../css/booksession.css";
const FA = require("react-fontawesome");
export class TypeOfService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfservice: props.service.services
    };
  }
  continue = e => {
    e.preventDefault();
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.typeOfservice !== undefined) {
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };
  render() {
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">Select Type of Service</strong>
              <div class="container-row book_session_radio">
                <div class="radio ">
                  <input
                    id="radio-21"
                    name="typeOfservice"
                    type="radio"
                    value="FITNESS"
                    checked={this.state.typeOfservice === "FITNESS"}
                    onChange={this.handleInputChange}
                    onClick={() => this.props.typeOfService("FITNESS")}
                  />
                  <label for="radio-21" className="book_radio">
                    Fitness
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-22"
                    name="typeOfservice"
                    type="radio"
                    value="YOGA"
                    checked={this.state.typeOfservice === "YOGA"}
                    onChange={this.handleInputChange}
                    onClick={() => this.props.typeOfService("YOGA")}
                  />
                  <label for="radio-22" className="book_radio">
                    Yoga
                  </label>
                </div>
              </div>
            </div>
          </div>
          <FA
            name="arrow-right"
            onClick={e => this.handleSubmit(e)}
            className="iconNext"
          />
        </ValidatorForm>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = State => {
  var user = State.bookSession;
  return { user: State.bookSession, service: State.serviceState };
};

const mapDispatchToProps = dispatch => {
  return {
    typeOfService: services => {
      dispatch(RegisterService(services));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TypeOfService);
