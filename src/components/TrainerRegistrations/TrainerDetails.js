import React from "react";
import { connect } from "react-redux";
import { createTrainerDetails, userLoginDetails } from "../../actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import CustomSpinner from "../Custom/spinner";
import { toastConfig } from "../Custom/ToastConfig";

const FA = require("react-fontawesome");

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.trainer.language,
      qualification: props.trainer.qualification,
      c_address: props.trainer.c_address,
      servicingArea: props.trainer.servicingArea,
      district: props.trainer.district,
      localState: props.trainer.localState,
      pin: props.trainer.pin,
      loading: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid && !this.state.pinError) {
      if (
        this.state.language.trim() &&
        this.state.qualification.trim() &&
        this.state.c_address.trim() &&
        this.state.pin.trim() &&
        this.state.servicingArea !== "" &&
        this.state.district !== "" &&
        this.state.localState !== ""
      ) {
        this.props.onAddPost(this.state);
        this.props.onSubmit();
      } else {
        toast("Please input all the required data !!", toastConfig);
      }
    }
  };
  handleReset = () => {
    this.setState({
      language: "",
      qualification: "",
      c_address: ""
    });
  };
  validate = () => {
    let languageError = "";
    let qualificationError = "";
    let c_addressError = "";

    if (!this.state.language) {
      languageError = toast("Language field cannot be empty", toastConfig);
    }
    if (!this.state.qualification) {
      qualificationError = toast(
        "Qualification field cannot be empty",
        toastConfig
      );
    }
    if (!this.state.c_address) {
      c_addressError = toast(
        "Current Address field cannot be empty",
        toastConfig
      );
    }
    if (languageError || qualificationError || c_addressError) {
      this.setState({
        languageError,
        qualificationError,
        c_addressError
      });
      return false;
    }
    return true;
  };

  getPincode = pin => {
    let self = this;
    this.setState({
      pin: pin.target.value
    });
    if (pin.target.value.length === 6) {
      self.setState({
        loading: true,
        pinError: false
      });
      fetch("https://api.postalpincode.in/pincode/" + pin.target.value)
        .then(function(response) {
          return response ? response.json() : {};
        })
        .then(function(data) {
          if (data[0].PostOffice) {
            let area = [];
            Object.keys(data[0].PostOffice).map(k => {
              area.push(data[0].PostOffice[k].Name);
              self.setState({
                servicingArea: area,
                localState: data[0].PostOffice[k].State,
                district: data[0].PostOffice[k].District
              });
            });
            self.setState({
              loading: false
            });
          } else {
            self.setState({
              loading: false,
              pinError: true
            });
            toast("Please enter valid pin", toastConfig);
          }
        });
    }
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <ValidatorForm onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <TextValidator
                    type="text"
                    placeholder="Languages"
                    className="form-control"
                    name="language"
                    onChange={this.handleInputChange}
                    value={this.state.language}
                    label="Language *"
                    validators={["required"]}
                    errorMessages={"Specify atleast one language !"}
                  />
                </div>
                <div className="form-group">
                  <span>Qualification(Choose the highest)</span>
                  <select
                    className="form-control dropdown"
                    id="education"
                    name="qualification"
                    onChange={this.handleInputChange}
                    value={this.state.qualification}
                  >
                    <option value="" selected="selected" disabled="disabled">
                      -- select one --
                    </option>
                    <option value="Primary education">Primary education</option>
                    <option value="Secondary education">
                      Secondary education or high school
                    </option>
                    <option value="Bachelor's degree">Bachelor's degree</option>
                    <option value="Master's degree">Master's degree</option>
                    <option value="Doctorate or higher">
                      Doctorate or higher
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <TextValidator
                    placeholder="Enter your current Address"
                    className="form-control"
                    name="c_address"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.c_address}
                    label="Current Residence address *"
                    validators={["required"]}
                    errorMessages={"This field is mandatory!"}
                  />
                </div>
                <div className="form-group">
                  <TextValidator
                    placeholder="Enter pin code"
                    className="form-control"
                    name="pincode"
                    type="text"
                    onChange={e => this.getPincode(e)}
                    value={this.state.pin}
                    label="Pincode *"
                    validators={["required"]}
                    errorMessages={"Please enter a valid pin code!"}
                    max="999999"
                    min="111111"
                    pattern="\d*"
                  />
                </div>

                {this.state.servicingArea ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    Serving Area
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.servicingArea.toString()}
                      />
                    </div>
                  </span>
                ) : null}
                {this.state.district ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    City
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.district}
                      />
                    </div>
                  </span>
                ) : null}
                {this.state.localState ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    State
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.localState}
                      />
                    </div>
                  </span>
                ) : null}
                <div className="iconContainerRow">
                  <FA
                    name="arrow-left"
                    onClick={() => this.props.previousPage()}
                    className="iconPrev"
                  />
                  <FA
                    name="arrow-right"
                    onClick={e => this.handleSubmit(e)}
                    className="iconNext"
                  />
                </div>
              </ValidatorForm>
            </div>
          </div>
          <ToastContainer transition={Flip} />
          {this.state.loading ? <CustomSpinner /> : null}
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: trainerdetails => {
      dispatch(createTrainerDetails(trainerdetails));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Step2);
