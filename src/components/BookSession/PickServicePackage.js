import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { createPickServicePackage, BookAmount } from "./../../actions/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
const FA = require("react-fontawesome");
export class PickServicePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainer_category: props.user.trainer_category
    };
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.trainer_category !== undefined) {
      this.props.onAddPost(self.trainer_category);
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
              <strong className="book_heading">
                Select your Suitable Trainer Category:
              </strong>
              <div class="container-row-trainer pick_service_radio">
                <div class="radio marginBottom_pick">
                  <span style={{ display: "flex" }}>
                    <input
                      id="radio-3"
                      name="trainer_category"
                      type="radio"
                      value="Basic"
                      checked={this.state.trainer_category === "Basic"}
                      onChange={this.handleInputChange}
                      onClick={() => {
                        this.props.getamount("49");
                      }}
                    />
                    <label for="radio-3" className="radio-label">
                      Basic
                    </label>
                    <b className="trainer_rupee">
                      <span>&#8377;4999</span>
                    </b>
                  </span>
                  <label className="Certified_trainer">
                    1-3 Year Experience ,Certified Trainer
                  </label>
                  <label className="Certified_trainer">
                    Includes 12 times session in 1 month
                  </label>
                </div>
                <div className="radio marginBottom">
                  <span style={{ display: "flex" }}>
                    <input
                      id="radio-4"
                      name="trainer_category"
                      type="radio"
                      value="Standard"
                      checked={this.state.trainer_category === "Standard"}
                      onChange={this.handleInputChange}
                      onClick={() => {
                        this.props.getamount("49");
                      }}
                    />
                    <label for="radio-4" className="radio-label">
                      Standard{" "}
                    </label>
                    <b className="trainer_rupee">
                      <span>&#8377;5999</span>
                    </b>
                  </span>
                  <label className="Certified_trainer">
                    3-5 Year Experience ,Certified Trainer
                  </label>
                  <label className="Certified_trainer">
                    Includes 12 times session in 1 month
                  </label>
                </div>
                <div className="radio marginBottom">
                  <span style={{ display: "flex" }}>
                    <input
                      id="radio-5"
                      name="trainer_category"
                      type="radio"
                      value="Premium"
                      checked={this.state.trainer_category === "Premium"}
                      onChange={this.handleInputChange}
                      onClick={() => {
                        this.props.getamount("49");
                      }}
                    />
                    <label for="radio-5" className="radio-label">
                      Premium{" "}
                    </label>
                    <b className="trainer_rupee">
                      <span>&#8377;7999</span>
                    </b>
                  </span>
                  <label className="Certified_trainer">
                    5+ Year Experience with Certification of National &
                    International Instutions
                  </label>
                  <label className="Certified_trainer">
                    Includes 12 times session in 1 month
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="iconContainerRow">
            <FA name="arrow-left" onClick={this.back} className="iconPrev" />
            <FA
              name="arrow-right"
              onClick={e => this.handleSubmit(e)}
              className="iconNext"
            />
          </div>
        </ValidatorForm>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = State => {
  var user = State.bookSession;
  return { user: State.bookSession };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: trainer_category => {
      dispatch(createPickServicePackage({ trainer_category }));
    },
    getamount: book_amount => {
      dispatch(BookAmount(book_amount));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PickServicePackage);
