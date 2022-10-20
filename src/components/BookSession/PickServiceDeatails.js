import React, { Component } from "react";
import { PaymentTransaction } from "../../actions/index";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { firebase } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import { capitalize } from "./../Custom/Capitalize";
const FA = require("react-fontawesome");
export class PickServiceDeatails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.user.useramount,
      name: props.userDetail.name ? props.userDetail.name : null,
      phone: props.userDetail.phoneNumber,
      status: "Session Booked",
      position: "",
      show: false,
      error: ""
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

  async handleClick(e) {
    e.preventDefault();
    let self = this;
    self.props.nextStep();
  }

  render() {
    return (
      <div>
        <ValidatorForm onSubmit={this.handleClick}></ValidatorForm>
        <h3>
          <center>Price Summary</center>
        </h3>
        <div className="container-row-service justify_content">
          <table className="table">
            <tbody>
              <tr>
                <th>Service</th>
                <td>
                  {this.props.service ? capitalize(this.props.service) : null}
                </td>
              </tr>
              <tr>
                <th>Service Package</th>
                <td>
                  {this.props.user.trainer_category
                    ? this.props.user.trainer_category
                    : null}
                </td>
              </tr>
              <tr>
                <th>SubTotal</th>
                <td className="packageamount">
                  &#8377;
                  {this.props.user.bookamount
                    ? this.props.user.bookamount
                    : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="iconContainerRow proceed_to_pay">
          <FA name="arrow-left" onClick={this.back} className="iconPrev" />
          <button
            type="submit"
            className="proceed"
            onClick={this.handleClick}
          >
            Proceed to pay
          </button>
        </div>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = State => {
  return {
    user: State.bookSession,
    userDetail: State.userDetail.userlogindetails,
    service: State.serviceState.services
  };
};
export default withRouter(connect(mapStateToProps, null)(PickServiceDeatails));
