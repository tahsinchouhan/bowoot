import React from "react";
import { dietplan, PaymentTransactionDietPlans } from "../../../actions/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../../firebase";
import { ButtonGroup, Button } from "react-bootstrap";
import { ToastContainer, toast, Flip } from "react-toastify";
import { toastConfig } from "../../Custom/ToastConfig";
import { Modal } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import "../../../css/yogaform.css";
import "react-toastify/dist/ReactToastify.css";

class YogaForm extends React.Component {
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
      diet: "",
      goal: "",
      period: "",
      name: "",
      phone: "",
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
  async handleClick(e) {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (
        this.state.gender &&
        this.state.service &&
        this.state.diet &&
        this.state.activity &&
        this.state.medical &&
        this.state.name &&
        this.state.phone &&
        this.state.age &&
        this.state.height &&
        this.state.weight &&
        this.state.goal &&
        this.state.period
      ) {
        var add = this.state;
        this.props.TrainerService(add);
        delete this.state.submitted;

        this.handleReset();
        this.props.close();
      } else {
        toast("Please input all the required data !!", toastConfig);
      }
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
      diet: "",
      goal: "",
      period: "",
      plan: ""
    });
  };
  handleClickforState() {
    this.setState({
      name: "",
      phone: ""
    });
  }
  myself() {
    var self = this;
    self.setState({
      name: self.props.userDetail.name,
      phone: self.props.userDetail.phoneNumber
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="scroll">
          <div className="container">
            <div className="enroll_card col-sm-12 col-xs-12 col-md-12 col-lg-12">
              <ValidatorForm
                onSubmit={() => this.handleClick()}
                className="formatfitness col-sm-12 col-xs-12 col-md-12 col-lg-12"
              >
                <div class="row col-sm-12 col-xs-12 col-md-12 col-lg-12">
                  <div class="col-sm-12 ">
                    <div class="container-row">
                      <div class="radio">
                        <input
                          id="radio-1"
                          name="service"
                          type="radio"
                          value="myself"
                          checked={this.state.service === "myself"}
                          onChange={this.handleInputChange}
                          validators={["required"]}
                          errorMessages={["Service cannot be empty"]}
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
                          validators={["required"]}
                          errorMessages={["Service cannot be empty"]}
                          onClick={() => {
                            this.handleClickforState();
                          }}
                        />
                        <label for="radio-2" className="radio-label">
                          For Others
                        </label>
                      </div>
                    </div>
                    <div className="container-row">
                      <div className="radio">
                        <input
                          id="radio-3"
                          name="gender"
                          type="radio"
                          value="male"
                          checked={this.state.gender === "male"}
                          onChange={this.handleInputChange}
                          validators={["required"]}
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
                          validators={["required"]}
                        />
                        <label for="radio-4" className="radio-label">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="form-inputfieldatyogaform">
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
                    </div>
                    <div className="form-group">
                      <div className="inputfield">
                        <TextValidator
                          label="Age *"
                          validators={[
                            "required",
                            "minNumber:18",
                            "maxNumber:200"
                          ]}
                          type="number"
                          className="form-control"
                          name="age"
                          onChange={this.handleInputChange}
                          value={this.state.age}
                          errorMessages={"Age should be between 18 - 200"}
                        />
                      </div>
                    </div>
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
                          label="Goal *(Reduce of the weight in Kgs)"
                          validators={["required"]}
                          errorMessages={"Please enter your Goal !"}
                          type="text  "
                          placeholder="Goal"
                          className="form-control"
                          name="goal"
                          onChange={this.handleInputChange}
                          value={this.state.goal}
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="inputfield">
                        <TextValidator
                          label="Period *(Cycles)"
                          validators={["required"]}
                          errorMessages={"Please enter your Period !"}
                          type="text"
                          placeholder="Goal"
                          className="form-control"
                          name="period"
                          onChange={this.handleInputChange}
                          value={this.state.period}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    style={{ color: "rgb(70,77,99)" }}
                    className="preferreddiet"
                  >
                    Preferred Diet
                  </label>

                  <div className="d-flex flex-column">
                    <ButtonGroup>
                      <Button
                        name="diet"
                        value="veg"
                        checked={this.state.diet === "veg"}
                        onClick={this.handleInputChange}
                        className={this.state.diet === "veg" ? "veg" : null}
                        style={{ background: "gray", border: 0 }}
                      >
                        Vegertain
                      </Button>
                      <Button
                        value="nonveg"
                        name="diet"
                        checked={this.state.diet === "nonveg"}
                        onClick={this.handleInputChange}
                        className={
                          this.state.diet === "nonveg" ? "nonveg" : null
                        }
                        style={{ background: "gray", border: 0 }}
                      >
                        Non vegertain
                      </Button>
                    </ButtonGroup>
                    <br />
                  </div>
                </div>

                <div>
                  <label
                    style={{ color: "rgb(70,77,99)" }}
                    className="dailylifestyle"
                  >
                    Daily Life Style Physical Activity{" "}
                  </label>

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
                        this.state.activity === "sedantary" ? "sedantary" : null
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
                  <br />
                </div>

                <div>
                  <br />
                  <label
                    style={{ color: "rgb(70,77,99)" }}
                    className="medicalcondition"
                  >
                    Do You have Any Medical Condition or Any Allergic with Any
                    Food?If yes Please describe Here!
                  </label>
                  <textarea
                    type="text"
                    className="form-control "
                    name="medical"
                    onChange={this.handleInputChange}
                    value={this.state.medical}
                  />
                </div>
                <br />
                <div className="marginforyogabutton">
                  <center>
                    <button
                      type="submit"
                      style={{ background: "greenYellow !important" }}
                      className="enroll_buttonforyoga"
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
  return {
    User: state.dietPlan,
    userDetail: state.userDetail.userlogindetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    TrainerService: trainerservice => {
      dispatch(dietplan(trainerservice));
    },
    paymentTransactionId: paymentid => {
      dispatch(PaymentTransactionDietPlans(paymentid));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YogaForm)
);
