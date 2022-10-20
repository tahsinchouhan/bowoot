import React from "react";
import { connect } from "react-redux";
import { createTrainer } from "../../actions";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../Custom/ToastConfig";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { firebase } from "../firebase";
import { Spinner } from "react-bootstrap";
import CustomSpinner from "../Custom/spinner";
import { functions_for_users } from "../../function_constant";

const FA = require("react-fontawesome");

class TrainerBasicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.trainer.name,
      age: props.trainer.age,
      gender: props.trainer.gender,
      formData: {
        phone: props.trainer.phone
      },
      email: props.trainer.email,
      submitted: false,
      emailPhone: false,
      loading: false
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPhoneMatch" || "required", value => {
      if (value !== undefined && value.length === 10) {
        return true;
      }
      return false;
    });
  }
  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleSubmit() {
    let self = this;
    self.setState({
      emailPhone: false,
      loading: true
    });
    if (
      this.state.name &&
      this.state.age &&
      this.state.gender &&
      this.state.formData.phone &&
      this.state.email
    ) {
      await fetch(functions_for_users.checkUserExists, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify({
          email: this.state.email
        })
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          if (response.status) {
            self.setState({
              emailPhone: true
            });
          }
        })
        .catch(err => {
          toast(err, toastConfig);
        });
      await fetch(functions_for_users.checkPhoneExits, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify({
          phone: "+91" + this.state.formData.phone
        })
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          if (response.status) {
            self.setState({
              emailPhone: true
            });
          }
        })
        .catch(err => {
          toast(err, toastConfig);
        });
      if (self.state.emailPhone) {
        self.setState({
          loading: false
        });
        toast(
          "Provided Email Id/Phone number already registered !",
          toastConfig
        );
      } else {
        self.setState({ submitted: true }, () => {
          self.setState({
            loading: false
          });
          if (self.state.gender !== undefined) {
            delete self.state.emailPhone;
            delete self.state.loading;
            self.props.onAddPost(this.state);
            self.props.onSubmit();
          } else {
            toast("Please input all the required data !!", toastConfig);
          }
        });
      }
    } else {
      self.setState({
        loading: false
      });
      toast("Please input all the required data !!", toastConfig);
    }
  }

  handleReset = () => {
    this.setState({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: ""
    });
  };

  render() {
    const { formData, submitted } = this.state;
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <div className="inputfield">
              <TextValidator
                label="Name *"
                validators={["required"]}
                errorMessages={"Please input your name !"}
                type="text"
                placeholder="Name"
                className="form-control"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Age *"
                validators={["required", "minNumber:18", "maxNumber:50"]}
                type="number"
                className="form-control"
                name="age"
                onChange={this.handleInputChange}
                value={this.state.age}
                errorMessages={"Age should be between 18 - 50"}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="row col-sm-6">
              <div className="book_session_radio">
                <input
                  id="radio-1"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-1" className="book_radio">
                  Male
                </label>
              </div>
              <div className="book_session_radio">
                <input
                  id="radio-2"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-2" className="book_radio">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Phone Number *"
                validators={["isPhoneMatch", "required"]}
                placeholder="Phone Number"
                className="form-control"
                name="phone"
                minlength={10}
                maxlength={12}
                size={12}
                onChange={this.handleChange}
                value={this.state.phone || formData.phone}
                type="number"
                pattern="/^-?\d+\.?\d*$/"
                errorMessages={"Please enter valid contact number  !"}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Email *"
                validators={["required", "isEmail"]}
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email || this.props.trainer.email}
                errorMessages={"This field is mandatory !"}
              />
            </div>
          </div>
          <div className="iconContainerRow">
            <FA
              name="arrow-left"
              onClick={() => this.props.previousPage()}
              className="iconPrev"
            />
            <FA
              name="arrow-right"
              onClick={() => this.handleSubmit()}
              className="iconNext"
            />
          </div>
        </ValidatorForm>
        <ToastContainer transition={Flip} />
        {this.state.loading ? <CustomSpinner /> : null}
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: trainer => {
      dispatch(createTrainer(trainer));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerBasicDetails);
