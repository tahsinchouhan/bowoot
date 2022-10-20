import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Modal, Button, NavItem, Accordion } from "react-bootstrap";
import {
  PaymentTransactionDietPlans,
  PaymentTransactionBookSession
} from "../../actions/index";
import { config } from "../Custom/RazorPay";
import Acknowledgement from "../Landing/Diet/Acknowledgement";
import CustomSpinner from "../Custom/spinner";
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      loading: false
    };
    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    let self = this,
      options;
    console.log(this.props);
    if (this.props.Diet.amount) {
      options = {
        key: config.apiKey,
        amount: this.props.Diet.amount * 100,
        name: this.props.details ? this.props.details.name : null,
        description: this.props.Diet ? this.props.Diet.plan : null,
        image: require("../../assests/bowoot_icon.png"),

        handler: function(response) {
          if (response.razorpay_payment_id) {
            self.props.paymentTransactionId(response.razorpay_payment_id);

            self.props.transactionoccurs();
          }
        },
        prefill: {
          contact: this.props.details ? this.props.details.phoneNumber : null,
          email: this.props.details ? this.props.details.email : null
        },
        theme: {
          color: "greenyellow"
        },
        modal: {
          escape: false,
          ondismiss: function() {
            self.props.refToParent();

            return false;
          }
        }
      };
    } else if (this.props.BookSession.bookamount) {
      options = {
        key: config.apiKey,
        amount: this.props.BookSession.bookamount * 100,
        name: this.props.details ? this.props.details.name : null,
        description: this.props.BookSession
          ? this.props.BookSession.typeOfservice
          : null,
        image: require("../../assests/bowoot_icon.png"),

        handler: function(response) {
          if (response.razorpay_payment_id) {
            self.props.paymentTxnIdBookSession(response.razorpay_payment_id);
          }
        },
        prefill: {
          contact: this.props.details ? this.props.details.phoneNumber : null,
          email: this.props.details ? this.props.details.email : null
        },
        theme: {
          color: "greenyellow"
        },
        modal: {
          escape: false,
          ondismiss: function() {
            self.props.refToParent();

            return false;
          }
        }
      };
    }

    let rzp = new window.Razorpay(options);
    rzp.open();
  }

  componentDidMount() {
    this.openCheckout();
  }

  render() {
    return <div></div>;
  }
}
const mapStateToProps = State => {
  return {
    Diet: State.dietPlan,
    BookSession: State.bookSession,
    details: State.userDetail.userlogindetails,
    formType: State.serviceState.formType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    paymentTransactionId: paymentid => {
      dispatch(PaymentTransactionDietPlans(paymentid));
    },
    paymentTxnIdBookSession: id => {
      dispatch(PaymentTransactionBookSession(id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Payment)
);
