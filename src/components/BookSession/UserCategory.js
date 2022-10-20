import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserCategory } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import "./../../css/booksession.css";
const FA = require("react-fontawesome");
export class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_category: props.user.user_category
    };
  }
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
    if (this.state.user_category !== undefined) {
      this.props.onAddPost(self.user_category);
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };
  handleReset = () => {
    this.setState({
      user_category: ""
    });
  };
  render() {
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">Training Needed for</strong>
              <div
                class="container-row book_session_radio user_category_column"
                style={{ flexWrap: "wrap" }}
              >
                <div class="radio ">
                  <input
                    id="radio-1"
                    name="user_category"
                    type="radio"
                    value="Male"
                    checked={this.state.user_category === "Male"}
                    onChange={this.handleInputChange}
                    className={
                      this.state.user_category === "Male" ? "Male" : null
                    }
                  />
                  <label for="radio-1" className="book_radio">
                    Male
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-2"
                    name="user_category"
                    type="radio"
                    value="Female"
                    checked={this.state.user_category === "Female"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-2" className="book_radio">
                    Female
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-3"
                    name="user_category"
                    type="radio"
                    value="Couple"
                    checked={this.state.user_category === "Couple"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-3" className="book_radio">
                    Couple
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-4"
                    name="user_category"
                    type="radio"
                    value="Group"
                    checked={this.state.user_category === "Group"}
                    onChange={this.handleInputChange}
                    validators={["required"]}
                    errorMessages={["Service cannot be empty"]}
                  />
                  <label for="radio-4" className="book_radio">
                    Group
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
          {/* <div className="form-group ">
          <div class="col-sm-12 submitAllignment">
            <button type="submit" className="buttonsubmit" onClick={this.back}>
            <i className="fa fa-long-arrow-left book_arrow"></i>
            </button>
            <button
              type="submit"
              className="buttonsubmit"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-long-arrow-right book_arrow" ></i>
            </button>
          </div>
        </div> */}
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
    onAddPost: user_category => {
      dispatch(createUserCategory({ user_category }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserCategory);
