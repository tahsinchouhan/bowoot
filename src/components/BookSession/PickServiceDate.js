import React, { Component } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { connect } from "react-redux";
import { createServiceDate } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import "./../../css/booksession.css";
const FA = require("react-fontawesome");
export class PickServiceDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trial_date: props.user.trial_date,
      temp_date: props.user.trial_date
    };
  }

  continue = e => {
    e.preventDefault();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleInputChangeToday = e => {
    this.handletoday();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInputChangeTomo = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleTomo();
  };

  handleTomo = () => {
    var tempTmrDate = new Date(new Date().valueOf() + 1000 * 3600 * 24),
      temp = [];
    var nextdate =
      tempTmrDate.getDate() +
      "-" +
      (tempTmrDate.getMonth() + 1) +
      "-" +
      tempTmrDate.getFullYear() +
      " ";
    const tomorow = nextdate;
    var x = 60; //minutes interval
    var tomotimes = []; // time array
    var tt = 360; // start time
    var ap = ["AM", "PM"]; // AM-PM
    //loop to increment the time and push results in array
    for (var i = 0; tt < 23 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      var mm = tt % 60; // getting minutes of the hour in 0-55 format
      tomotimes[i] = ("0" + hh).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
      temp[i] = tomotimes[i];
      // this.props.callParentTomo(tomotimes[i]);
    }
    this.setState({
      temp_date: temp
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.trial_date !== undefined) {
      this.props.callParent(this.state.temp_date || this.props.user.trial_date);
      this.props.onAddPost(self.trial_date);
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };

  handletoday = () => {
    var tempDate = new Date(),
      temp = [];
    var date =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear() +
      " ";
    const today = date;
    var todaytime = tempDate.getHours();
    if (today) {
      if (todaytime <= 12) {
        todaytime = todaytime + 4;
        var x = 60; //minutes interval
        var times = []; // time array
        var tt = 0; // start time
        var ap = ["AM", "PM"]; // AM-PM

        //loop to increment the time and push results in array
        for (var i = 0; tt < 23 * 60; i++) {
          var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
          var mm = tt % 60; // getting minutes of the hour in 0-55 format
          times[i] = ("0" + hh).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
          tt = tt + x;
          if (times[i] > todaytime && times[i] < 22) {
            temp[i] = times[i];
            // this.props.callParent(times[i]);
          }
        }
        this.setState({
          temp_date: temp.filter(Boolean)
        });
      } else {
        toast("No slots are their !!", toastConfig);
      }
    }
  };

  render() {
    var tempDate = new Date();
    var date =
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      "-" +
      tempDate.getFullYear() +
      " ";
    var todaytime = tempDate.getHours();

    const today = date;

    var tempTmrDate = new Date(new Date().valueOf() + 1000 * 3600 * 24);
    var nextdate =
      (tempTmrDate.getMonth() + 1) +
      "-" +
      tempTmrDate.getDate() +
      "-" +
      tempTmrDate.getFullYear() +
      " ";
    const tomorow = nextdate;

    var tempdayAter = new Date(new Date().valueOf() + 1000 * 3600 * 48);
    var nextdayater = tempdayAter.getDay();
    var weekday = new Array(7);
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[0] = "Sunday";
    var nextdayaterfirebase =
      (tempdayAter.getMonth() + 1)+
      "-" +
      tempdayAter.getDate() +
      "-" +
      tempdayAter.getFullYear() +
      " ";
    const dayafterfire = nextdayaterfirebase;
    const dayaftertmrw = weekday[nextdayater];

    var tempdayAterTmr = new Date(new Date().valueOf() + 1000 * 3600 * 72);
    var nextdayatertmr = tempdayAterTmr.getDay();
    var nextdayaterTmrfirebase =
     (tempdayAterTmr.getMonth() + 1) +
      "-" +
      tempdayAterTmr.getDate()+
      "-" +
      tempdayAterTmr.getFullYear() +
      " ";
    const dayaftertmrfire = nextdayaterTmrfirebase;
    const dayaftertmrwDay = weekday[nextdayatertmr];
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">Select Trial Date</strong>
              <div
                class="container-row book_session_radio user_category_column"
                style={{ flexWrap: "wrap" }}
              >
                {todaytime >= 12 ? null : (
                  <div className="radio ">
                    <input
                      id="radio-1"
                      name="trial_date"
                      type="radio"
                      value={today}
                      checked={this.state.trial_date === today}
                      onChange={this.handleInputChangeToday}
                    />
                    <label for="radio-1" className="book_radio">
                      Today
                    </label>
                  </div>
                )}
                <div className="radio">
                  <input
                    id="radio-2"
                    name="trial_date"
                    type="radio"
                    value={tomorow}
                    checked={this.state.trial_date === tomorow}
                    onChange={this.handleInputChangeTomo}
                  />
                  <label for="radio-2" className="book_radio">
                    Tomorrow
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-3"
                    name="trial_date"
                    type="radio"
                    value={dayafterfire}
                    checked={this.state.trial_date === dayafterfire}
                    onChange={this.handleInputChangeTomo}
                  />
                  <label for="radio-3" className="book_radio">
                    {dayaftertmrw}
                  </label>
                </div>
                {todaytime >= 12 ? (
                  <div className="radio">
                    <input
                      id="radio-4"
                      name="trial_date"
                      type="radio"
                      value={dayaftertmrfire}
                      checked={this.state.trial_date === dayaftertmrfire}
                      onChange={this.handleInputChangeTomo}
                    />
                    <label for="radio-4" className="book_radio">
                      {dayaftertmrwDay}
                    </label>
                  </div>
                ) : null}
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
    onAddPost: trial_date => {
      dispatch(createServiceDate({ trial_date }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PickServiceDate);
