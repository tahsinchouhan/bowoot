import React, { Component } from "react";
import { TrainerType } from "../../actions";
import { connect } from "react-redux";
import { toast, ToastContainer, Flip } from "react-toastify";
import { toastConfig } from "../Custom/ToastConfig";

const FA = require("react-fontawesome");

class Typeoftrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.trainer.serviceType
    };
  }

  selectType(e) {
    let array = this.state.type,
      newItem = e.target.value;
    array.indexOf(newItem) === -1 ? array.push(newItem) : array.pop(newItem);
    this.setState({
      type: array
    });
  }

  submitTypeOfTrainer() {
    if (this.state.type.length > 0) {
      this.props.storeTrainerType(this.state.type);
      this.props.onSubmit();
    } else {
      toast("Please choose atleast One !", toastConfig);
    }
  }

  render() {
    console.log(this.state.type);
    return (
      <div className="col-sm-12">
        <h4>You are good at ? </h4>
        <div className="typeButtonContainer">
          <button
            value="Fitness"
            className={
              this.state.type
                ? this.state.type.indexOf("Fitness") === -1
                  ? " buttonTrainerSelect"
                  : "buttonTrainerSelectActive"
                : "buttonTrainerSelect"
            }
            onClick={e => {
              this.selectType(e);
            }}
          >
            Fitness Training
          </button>
          <button
            value="Yoga"
            className={
              this.state.type
                ? this.state.type.indexOf("Yoga") === -1
                  ? " buttonTrainerSelect"
                  : "buttonTrainerSelectActive"
                : "buttonTrainerSelect"
            }
            onClick={e => {
              this.selectType(e);
            }}
          >
            Yoga Training
          </button>
        </div>
        <FA
          name="arrow-right"
          onClick={() => this.submitTypeOfTrainer()}
          className="iconNext"
        />
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}

const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    storeTrainerType: data => {
      dispatch(TrainerType(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Typeoftrainer);
