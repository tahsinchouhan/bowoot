import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { createPickServiceTime } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import { TimePickJson } from "./TimePickJson";
const FA = require("react-fontawesome");
export class PickTrialTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trial_time: props.user.trial_time,
      localtimestochild: props.time
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
      trial_time: e
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.trial_time !== undefined) {
      this.setState({
        localtimestochild: []
      });
      this.props.onAddPost(self.trial_time);
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };

  render() {
    Object.keys(TimePickJson).map((i, temp) => {
      console.log(
        TimePickJson[this.state.localtimestochild[temp]],
        i,
        this.state.localtimestochild[temp]
      );
    });
    return (
      <div>
        <strong className="book_heading">Select Trial Time</strong>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="book_service_time">
            {Object.keys(TimePickJson).map((i, element) => {
              return (
                <div className="input">
                  <div className="form-group">
                    <div className="container-row-trainer book_session_radio">
                      {TimePickJson[this.state.localtimestochild[element]] ? (
                        <div className="radio">
                          <input
                            id={i}
                            name="trial_time"
                            type="radio"
                            value={
                              TimePickJson[
                                this.state.localtimestochild[element]
                              ]
                            }
                            checked={
                              this.state.trial_time ===
                              TimePickJson[
                                this.state.localtimestochild[element]
                              ]
                            }
                            onClick={e =>
                              this.handleInputChange(e.target.value)
                            }
                          />
                          <label for={i} className="book_radio">
                            {
                              TimePickJson[
                                this.state.localtimestochild[element]
                              ]
                            }
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
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
  return { user: State.bookSession };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: trial_time => {
      dispatch(createPickServiceTime({ trial_time }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PickTrialTime);
