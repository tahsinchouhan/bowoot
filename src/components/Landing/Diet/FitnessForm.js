import React from "react";
import {
  fitnessplan,
  USERDETIALS,
  RegisterService,
  PaymentTransactionDietPlans
} from "../../../actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { firebase } from "../../firebase";
import { ButtonGroup, Button } from "react-bootstrap";
import { ToastContainer, toast, Flip } from "react-toastify";
import { toastConfig } from "../../Custom/ToastConfig";
import { Modal } from "react-bootstrap";

import "../../../css/fitnessform.css";
import "react-toastify/dist/ReactToastify.css";

// import Acknowledgement from "../Landing/Acknowledgement";
class FitnessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "",
      age: "",
      gender: "",
      medical: "",
      height: "",
      weight: "",
      activity: "",
      name: "",
      phone: "",
      goal: "",
      pain: "",
      injury: "",
      workpreference: "",
      goalreach: "",

      plan: props.User.plan,
      amount: props.User.amount,
      submitted: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClickforState() {
    console.log("some thing form state");
    this.setState({
      name: "",
      phone: ""
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (
        this.state.service &&
        this.state.gender &&
        this.state.name &&
        this.state.phone &&
        this.state.height &&
        this.state.weight &&
        this.state.pain &&
        this.state.injury &&
        this.state.goalreach &&
        this.state.age &&
        this.state.goal &&
        this.state.workpreference &&
        this.state.gymwork &&
        this.state.medical
      ) {
        this.props.FITNESSPLAN(this.state);
        delete this.state.submitted;
        // var user = firebase.auth().currentUser;
        // var ref = firebase
        //   .database()
        //   .ref("users")
        //   .child(user.uid)
        //   .child("dietPlan")
        //   .child(this.props.User.TransactionID);
        // ref.set(this.state).then(() => {
        //   this.props.FITNESSPLAN("");
        //   //this.props.paymentTransactionId("");
        //   this.props.passingservice("");
        // });
        // this.handleReset();
        this.props.close();
      } else {
        toast("Please input all the required data !!", toastConfig);
      }
    });
  };

  myself() {
    var self = this;
    self.setState({
      name: self.props.userDetail.name,
      phone: self.props.userDetail.phoneNumber
    });
  }

  handleReset = () => {
    this.setState({
      service: "",
      age: "",
      gender: "",
      medical: "",
      height: "",
      weight: "",
      activity: "",
      name: "",
      goal: "",
      pain: "",
      injury: "",
      workpreference: "",
      goalreach: ""
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="scroll">
          <div className="container">
            <div className="enroll_card col-sm-12 col-xs-12 col-md-12 col-lg-12">
              <ValidatorForm
                onSubmit={this.handleClick}
                className="formatfitness"
              >
                <div class="row">
                  <div class="col-sm-12  marginformyself">
                    <div className="form-group">
                      <div className="container-row">
                        <div className="radio">
                          <input
                            id="radio-1"
                            name="service"
                            type="radio"
                            value="myself"
                            checked={this.state.service === "myself"}
                            onChange={this.handleInputChange}
                            onClick={() => {
                              this.myself();
                            }}
                          />
                          <label for="radio-1" className="radio-label">
                            Myself
                          </label>
                        </div>
                        <div className="radio">
                          <input
                            id="radio-2"
                            name="service"
                            type="radio"
                            value="forothers"
                            checked={this.state.service === "forothers"}
                            onChange={this.handleInputChange}
                            onClick={() => {
                              this.handleClickforState();
                            }}
                          />
                          <label for="radio-2" className="radio-label">
                            Forothers
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="container-row">
                        <div className="radio">
                          <input
                            id="radio-3"
                            name="gender"
                            type="radio"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.handleInputChange}
                          />
                          <label for="radio-3" className="radio-label">
                            Male
                          </label>
                        </div>
                        <div className="radio">
                          <input
                            id="radio-4"
                            name="gender"
                            type="radio"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleInputChange}
                          />
                          <label for="radio-4" className="radio-label">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    {this.state.service === "forothers" ? (
                      <div>
                        <div className="form-group ">
                          <div className="inputfield">
                            <TextValidator
                              label="Name *  "
                              validators={["required"]}
                              errorMessages={"Please enter your Name !"}
                              type="text"
                              placeholder="Name"
                              className="form-control"
                              name="name"
                              onChange={this.handleInputChange}
                              value={this.state.name}
                            />
                          </div>
                        </div>

                        <div className="form-group ">
                          <div className="inputfield">
                            <TextValidator
                              label="Phone *"
                              validators={["required"]}
                              errorMessages={"Please enter your Phone no !"}
                              type="number"
                              placeholder="phone"
                              className="form-control"
                              name="phone"
                              onChange={this.handleInputChange}
                              value={this.state.phone}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Height *  (Feet)"
                          validators={["required"]}
                          errorMessages={"Please enter your height !"}
                          type="number"
                          placeholder="Height"
                          className="form-control"
                          name="height"
                          onChange={this.handleInputChange}
                          value={this.state.height}
                        />
                      </div>
                    </div>

                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Weight *  (Kgs)"
                          validators={["required"]}
                          errorMessages={"Please enter your weight !"}
                          type="number"
                          placeholder="Weight"
                          className="form-control"
                          name="weight"
                          onChange={this.handleInputChange}
                          value={this.state.weight}
                        />
                      </div>
                    </div>

                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Any pain in body  *"
                          validators={["required"]}
                          errorMessages={"Please may i know !"}
                          type="text"
                          placeholder="Pain"
                          className="form-control"
                          name="pain"
                          onChange={this.handleInputChange}
                          value={this.state.pain}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Any injury *"
                          validators={["required"]}
                          errorMessages={"Please enter your injury !"}
                          type="text"
                          placeholder="Injury"
                          className="form-control"
                          name="injury"
                          onChange={this.handleInputChange}
                          value={this.state.injury}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="inputfield">
                        <TextValidator
                          label="Age *"
                          validators={[
                            "required",
                            "minNumber:18",
                            "maxNumber:50"
                          ]}
                          type="number"
                          className="form-control"
                          name="age"
                          onChange={this.handleInputChange}
                          value={this.state.age}
                          errorMessages={"Age should be between 18 - 50"}
                        />
                      </div>
                    </div>

                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Goal*(Decrease of Weight)"
                          validators={["required"]}
                          errorMessages={"Please enter your Goal !"}
                          type="number"
                          placeholder="Goal"
                          className="form-control"
                          name="goal"
                          onChange={this.handleInputChange}
                          value={this.state.goal}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6"></div>
                </div>

                <div className="form-inputfieldatfitnessform">
                  <label
                    className="workoutpreference"
                    style={{ color: "rgb(70,77,99)" }}
                  >
                    Workout Preference
                  </label>
                  <br />
                  <div className="d-flex flex-column workoutpreference">
                    <ButtonGroup>
                      <Button
                        name="workpreference"
                        value="INGYM"
                        checked={this.state.workpreference === "INGYM"}
                        onClick={this.handleInputChange}
                        className={
                          this.state.workpreference === "INGYM" ? "inGym" : null
                        }
                        style={{ background: "gray", border: 0 }}
                      >
                        At gym
                      </Button>
                      <Button
                        value="INHOME"
                        name="workpreference"
                        checked={this.state.workpreference === "INHOME"}
                        onClick={this.handleInputChange}
                        className={
                          this.state.workpreference === "INHOME"
                            ? "inHome"
                            : null
                        }
                        style={{ background: "gray", border: 0 }}
                      >
                        At Home
                      </Button>
                    </ButtonGroup>
                  </div>
                  <br />
                </div>

                <br />

                <div className="form-group">
                  <label
                    className="wanttoacheievegoal"
                    style={{ color: "rgb(70,77,99)" }}
                  >
                    Want to acheive Goal in
                  </label>
                  <select
                    className="form-control dropdown "
                    id="goalreach"
                    name="goalreach"
                    onChange={this.handleInputChange}
                    value={this.state.goalreach}
                  >
                    <option value="" selected="selected" disabled="disabled">
                      -- select one --
                    </option>

                    <option value="3 MONTH">3 MONTH</option>
                    <option value="6 MONTH">6 MONTH</option>
                  </select>
                </div>

                <div className="form-group ">
                  <label
                    className="whendidulastworkout"
                    style={{ color: "rgb(70,77,99)" }}
                  >
                    When did your Last Workout
                  </label>
                  <select
                    className="form-control dropdown"
                    id="gymwork"
                    name="gymwork"
                    onChange={this.handleInputChange}
                    value={this.state.gymwork}
                  >
                    <option value="" selected="selected" disabled="disabled">
                      -- select one --
                    </option>

                    <option value="Doing Regular">Doing Regular</option>
                    <option value="Before 15 days">Before 15 days</option>
                    <option value="Before 30 days">Before 30 days</option>
                    <option value=" No excercise from last 2 months">
                      No excercise from last 2 months
                    </option>
                  </select>
                </div>

                <div className="form-inputfieldatfitnessform">
                  <label
                    className="dailylifestyle"
                    style={{ color: "rgb(70,77,99)" }}
                  >
                    Daily Life Style Physical Activity
                  </label>
                  <br />
                  <div className="d-flex flex-column dailylifestyle">
                    <ButtonGroup>
                      <Button
                        name="activity"
                        value="low"
                        onClick={() => {
                          this.setState({ activity: "low" });
                        }}
                        className={this.state.activity === "low" ? "low" : null}
                        style={{ background: "gray", border: 0 }}
                      >
                        Low Active
                      </Button>
                      <Button
                        name="activity "
                        value="sedentary"
                        onClick={() => {
                          this.setState({ activity: "sedantary" });
                        }}
                        className={
                          this.state.activity === "sedantary"
                            ? "sedantary"
                            : null
                        }
                        style={{ background: "gray", border: 0 }}
                      >
                        Sedentary Active
                      </Button>
                      <Button
                        type="button"
                        value="moderate"
                        name="activity"
                        onClick={() => {
                          this.setState({ activity: "moderate" });
                        }}
                        className={
                          this.state.activity === "moderate" ? "moderate" : null
                        }
                        style={{ background: "gray", border: 0 }}
                      >
                        Moderate Active
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
                <br />
                <div className="form-inputfieldatfitnessform">
                  <label
                    className="medicalcondition"
                    style={{ color: "rgb(70,77,99)" }}
                  >
                    Do You have Any Medical Condition or Any Allergic with Any
                    Food?If yes Please describe Here!
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="medical"
                    onChange={this.handleInputChange}
                    value={this.state.medical}
                  />
                </div>
                <br />

                <div className="marginforbutton">
                  <center>
                    <button
                      type="submit"
                      style={{ background: "greenYellow !important" }}
                      className="enroll_buttonforfitness"
                      onClick={e => this.handleClick(e)}
                    >
                      Compute Assessment
                    </button>
                  </center>
                </div>
              </ValidatorForm>
              <ToastContainer transition={Flip} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("the state of payment id", state);
  return {
    User: state.dietPlan,
    userDetail: state.userDetail.userlogindetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    FITNESSPLAN: fitnessplans => {
      console.log(fitnessplans);
      dispatch(fitnessplan(fitnessplans));
    },
    namephoneNumber: details => {
      console.log(details);
      dispatch(USERDETIALS(details));
    },
    passingservice: service => {
      console.log(service);
      dispatch(RegisterService(service));
    }
    // paymentTransactionId: paymentid => {
    //   dispatch(PaymentTransactionDietPlans(paymentid));
    // }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FitnessForm)
);
