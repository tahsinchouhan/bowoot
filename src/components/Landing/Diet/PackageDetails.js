import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Payment from "../Payment";
import { firebase } from "../../firebase";
import { Modal } from "react-bootstrap";
import Acknowledgement from "./Acknowledgement";
import FitnessForm from "./FitnessForm";
import YogaForm from "./YogaForm";
import { SHOWMODAL, TotalAmount } from "../../../actions/index";

import "../../../css/packageDetails.css";

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      scrolled: false,
      showFitnessForm: false,
      showDietForm: false,
      amount: props.User.amount
    };
  }

  handleInputChange = e => {
    this.setState({
      amount: e.target.value
    });
    console.log(this.state.amount, e.target.value);
  };

  ProceedtoPayment = () => {
    var self = this;
    self.props.closepackage();
    self.props.showformmodels("showmodal");

    self.props.getamount(self.state.amount);
  };

  render() {
    let self = this;

    return (
      <div className="packagedetails">
        <div className="packageSummary">Price Summary</div>

        <div className="servicegap">
          <span className="servicebold">SERVICE</span>
          <span className="servicecolor">{this.props.User.plan}</span>
        </div>

        {this.props.User.description === "something" ? null : (
          <div className="descriptiongap">
            <span className="description">{this.props.User.description}</span>
          </div>
        )}
        <div className="radio packageMonth">
          <div className="packageMonth">
            <input
              id="radio-3"
              name="amount"
              type="radio"
              value={this.props.User.amount}
              checked={this.state.amount === this.props.User.amount}
              onChange={this.handleInputChange}
            />
            <label for="radio-3" className="radio-label ">
              One Month Plan RS.
            </label>
          </div>
          <label for="radio-3" className="radio-label ">
            {this.props.User.amount}
          </label>
        </div>

        <div className="radio packageMonth">
          <div className="packageMonth">
            <input
              id="radio-4"
              name="amount"
              type="radio"
              value={this.props.User.amount * 3 - this.props.User.amount * 0.75}
              checked={
                this.state.amount ==
                this.props.User.amount * 3 - this.props.User.amount * 0.75
                  ? true
                  : false
              }
              onChange={this.handleInputChange}
            />
            <label for="radio-4" className="radio-label">
              Three Month Plan RS.
            </label>
          </div>
          <label for="radio-4" className="radio-label">
            {this.props.User.amount * 3 - this.props.User.amount * 0.75}
          </label>
        </div>

        <hr />
        <div className="amountgap">
          <span className="subtotal">Sub Total</span>
          <div className="packageamount">&#x20A8;. {this.state.amount}</div>
        </div>
        <hr />

        <div className="packagebutton">
          <button
            className="howitcomponent_buttoncancel "
            onClick={() => this.props.closepackage()}
          >
            Cancel
          </button>
          <button
            className="howitcomponent_buttonproceed "
            onClick={() => this.ProceedtoPayment()}
          >
            {this.state.scrolled ? "Pay" : "Proceed to Pay"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("the state of payment id", state);
  return {
    User: state.dietPlan
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showformmodels: showmodal => {
      dispatch(SHOWMODAL(showmodal));
    },
    getamount: amount => {
      dispatch(TotalAmount(amount));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PackageDetails)
);
