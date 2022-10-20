import React from "react";
import { userAddress } from "../../actions/index";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { firebase } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
const FA = require("react-fontawesome");
class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assistance: props.user.assistance,
      address: props.user.address,
      landmark: props.user.landmark,
      area: props.user.area,
      name: props.userDetail.name ?  props.user.name:null,
      phone: props.userDetail.phoneNumber ?  props.user.phone:null,
      status: "Session Booked",
      position: "",
      show: false,
      error: "",
      pincode: props.user.pincode,
      submitted: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        self.setState({
          position: position.coords.latitude + "," + position.coords.longitude
        });
      });
    }
    ValidatorForm.addValidationRule("isPhoneMatch" || "required", value => {
      if (value !== undefined && value.length === 10) {
        return true;
      }
      return false;
    });
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

  async handleClick(e) {
    this.setState({ submitted: true }, () => {
      e.preventDefault();
      let self = this;
      if (
        this.state.assistance &&
        this.state.address &&
        this.state.landmark &&
        this.state.area &&
        this.state.name &&
        this.state.phone &&
        this.state.pincode
      ) {
        var add = this.state;
        this.props.UserAddress(add);
        delete this.props.user.page;
        this.props.nextStep();
      } else {
        toast("Please input all the required data !!", toastConfig);
      }
    });
  }
  handleReset = () => {
    this.setState({
      assistance: "",
      address: "",
      landmark: "",
      area: "",
      name: "",
      phone: "",
      amount: ""
    });
  };
  handleClickforState() {
    console.log("some thing form state");
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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <ValidatorForm onSubmit={this.handleClick}>
                <div className="form-group">
                  <div className="container-row">
                    <div className="radio">
                      <input
                        id="radio-1"
                        type="radio"
                        name="assistance"
                        value="myself"
                        checked={this.state.assistance === "myself"}
                        onChange={this.handleInputChange}
                        onClick={() => {
                          this.myself();
                        }}
                      />
                      <label for="radio-1" className="radio-label">
                        My Self
                      </label>
                    </div>
                    <div className="radio">
                      <input
                        id="radio-2"
                        type="radio"
                        name="assistance"
                        value="forothers"
                        checked={this.state.assistance === "forothers"}
                        onChange={this.handleInputChange}
                        onClick={() => {
                          this.handleClickforState();
                        }}
                      />
                      <label for="radio-2" className="radio-label">
                        For Others
                      </label>
                    </div>
                  </div>
                </div>
                {this.state.assistance === "forothers" ? (
                  <div>
                    <div className="form-group">
                      <TextValidator
                        label="Name *"
                        type="text"
                        placeholder="Enter Name"
                        className="form-control"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.name}
                        validators={["required"]}
                        errorMessages={"This field is mandatory!"}
                      />
                    </div>
                    <div className="form-group">
                      <TextValidator
                        label="Contact Number *"
                        type="number"
                        placeholder="Enter Contact Number"
                        className="form-control"
                        name="phone"
                        onChange={this.handleInputChange}
                        value={this.state.phone}
                        validators={["required", "isPhoneMatch"]}
                        errorMessages={"This field is mandatory!"}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="form-group">
                  <TextValidator
                    label="Address *"
                    type="text"
                    placeholder="Enter Your Address"
                    className="form-control"
                    name="address"
                    onChange={this.handleInputChange}
                    value={this.state.address}
                    validators={["required"]}
                    errorMessages={"This field is mandatory!"}
                  />
                </div>
                <div className="form-group">
                  <TextValidator
                    placeholder="Enter your Landmark"
                    className="form-control"
                    name="landmark"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.landmark}
                    label="Landmark *"
                    validators={["required"]}
                    errorMessages={"This field is mandatory!"}
                  />
                </div>
                <div className="form-group">
                  <TextValidator
                    placeholder="Enter your Area"
                    className="form-control"
                    name="area"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.area}
                    label="Area *"
                    validators={["required"]}
                    errorMessages={"This field is mandatory!"}
                  />
                </div>
                <div className="form-group">
                  <TextValidator
                    placeholder="Enter pin code"
                    className="form-control"
                    name="pincode"
                    type="number"
                    value={this.state.pincode}
                    onChange={this.handleInputChange}
                    label="Pincode *"
                    validators={[
                      "required",
                      "minNumber:111111",
                      "maxNumber:999999"
                    ]}
                    errorMessages={"Please enter a valid pin code!"}
                    max="999999"
                    min="111111"
                    pattern="\d*"
                  />
                </div>
                <div className="iconContainerRow">
                  <FA
                    name="arrow-left"
                    onClick={this.back}
                    className="iconPrev"
                  />
                  <FA
                    name="arrow-right"
                    onClick={e => this.handleClick(e)}
                    className="iconNext"
                  />
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
const mapStateToProps = State => {
  return {
    user: State.bookSession,
    userDetail: State.userDetail.userlogindetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    UserAddress: address => {
      dispatch(userAddress(address));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Address)
);
