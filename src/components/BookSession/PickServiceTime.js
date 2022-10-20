import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { createPickTrialDate } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
const FA = require("react-fontawesome");
Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};
export class PickServiceTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfservice: props.service.services ? props.service.services : null,
      service_time: props.user.service_time
    };
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.service_time !== undefined) {
      this.props.onAddPost(self.service_time, this.props.service.services);
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    let temp = this.state.startDate;
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">
                Generally At what time you want to be served?
              </strong>
              <div class="book_service_time book_session_radio">
                <div class="radio">
                  <input
                    id="radio-1"
                    name="service_time"
                    type="radio"
                    value="6:00-7:00AM"
                    checked={this.state.service_time === "6:00-7:00AM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-1" class="book_radio margin_radio">
                    6:00-7:00AM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-2"
                    name="service_time"
                    type="radio"
                    value="7:00-8:00AM"
                    checked={this.state.service_time === "7:00-8:00AM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-2" class="book_radio margin_radio">
                    7:00-8:00AM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-3"
                    name="service_time"
                    type="radio"
                    value="8:00-9:00AM"
                    checked={this.state.service_time === "8:00-9:00AM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-3" class="book_radio margin_radio">
                    8:00-9:00AM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-4"
                    name="service_time"
                    type="radio"
                    value="9:00-10:00AM"
                    checked={this.state.service_time === "9:00-10:00AM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-4" class="book_radio margin_radio">
                    9:00-10:00AM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-5"
                    name="service_time"
                    type="radio"
                    value="10:00-11:00AM"
                    checked={this.state.service_time === "10:00-11:00AM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-5" class="book_radio margin_radio">
                    10:00-11:00AM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-6"
                    name="service_time"
                    type="radio"
                    value="11:00AM-12:00PM"
                    checked={this.state.service_time === "11:00AM-12:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-6" class="book_radio margin_radio">
                    11:00AM-12:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-7"
                    name="service_time"
                    type="radio"
                    value="12:00-1:00PM"
                    checked={this.state.service_time === "12:00-1:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-7" class="book_radio margin_radio">
                    12:00-1:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-8"
                    name="service_time"
                    type="radio"
                    value="1:00-2:00PM"
                    checked={this.state.service_time === "1:00-2:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-8" class="book_radio margin_radio">
                    1:00-2:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-9"
                    name="service_time"
                    type="radio"
                    value="2:00-3:00PM"
                    checked={this.state.service_time === "2:00-3:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-9" class="book_radio margin_radio">
                    2:00-3:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-10"
                    name="service_time"
                    type="radio"
                    value="3:00-4:00PM"
                    checked={this.state.service_time === "3:00-4:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-10" class="book_radio margin_radio">
                    3:00-4:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-11"
                    name="service_time"
                    type="radio"
                    value="4:00-5:00PM"
                    checked={this.state.service_time === "4:00-5:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-11" class="book_radio margin_radio">
                    4:00-5:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-12"
                    name="service_time"
                    type="radio"
                    value="5:00-6:00PM"
                    checked={this.state.service_time === "5:00-6:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-12" class="book_radio margin_radio">
                    5:00-6:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-13"
                    name="service_time"
                    type="radio"
                    value="6:00-7:00PM"
                    checked={this.state.service_time === "6:00-7:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-13" class="book_radio margin_radio">
                    6:00-7:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-14"
                    name="service_time"
                    type="radio"
                    value="7:00-8:00PM"
                    checked={this.state.service_time === "7:00-8:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-14" class="book_radio margin_radio">
                    7:00-8:00PM
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-15"
                    name="service_time"
                    type="radio"
                    value="8:00-9:00PM"
                    checked={this.state.service_time === "8:00-9:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-15" class="book_radio margin_radio">
                    8:00-9:00PM
                  </label>
                </div>
                <div class="radio">
                  <input
                    id="radio-16"
                    name="service_time"
                    type="radio"
                    value="9:00-10:00PM"
                    checked={this.state.service_time === "9:00-10:00PM"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-16" class="book_radio margin_radio">
                    9:00-10:00PM
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
  return { user: State.bookSession, service: State.serviceState };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (service_time, typeOfservice) => {
      dispatch(createPickTrialDate({ service_time, typeOfservice }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PickServiceTime);
