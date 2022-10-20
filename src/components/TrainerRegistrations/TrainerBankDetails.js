import React from "react";
import { connect } from "react-redux";
import { createTrainerBankDetails } from "../../actions";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../Custom/ToastConfig";
import { capitalize } from "../Custom/Capitalize";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const FA = require("react-fontawesome");

class TrainerBankDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        account_no: props.trainer.account_no,
        confirm_account_no: props.trainer.confirm_account_no
      },
      account_holder_name: props.trainer.account_holder_name,
      ifsc_code: props.trainer.ifsc_code,
      bank_name: props.trainer.bank_name,
      branch_name: props.trainer.branch_name
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isIFSCMatch" || "required", value => {
      if ((value && value.length === 11) || value === undefined) {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule(
      "isAccountNumberMatch" || "required",
      value => {
        if (value === this.state.formData.account_no || value === undefined) {
          return true;
        } else {
          return false;
        }
      }
    );
    ValidatorForm.addValidationRule("account_no" || "required", value => {
      if (
        (value && value.length > 6 && value.length < 16) ||
        value === undefined
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  handleInputChange_formData = e => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    let data = this.state,
      temp = [];

    if (
      (data.formData.account_no &&
        data.formData.confirm_account_no &&
        data.account_holder_name &&
        data.ifsc_code &&
        data.bank_name &&
        data.branch_name) !== undefined
    ) {
      this.props.onAddBankDetails(this.state);
      this.props.onSubmit();
    } else {
      Object.keys(data.formData).map(k => {
        return data.formData[k]
          ? null
          : temp.push(capitalize(k).replace("_", " "));
      });

      Object.keys(data).map(i => {
        return data[i] ? null : temp.push(capitalize(i).replace("_", " "));
      });

      console.log(temp);
      toast(
        "Please provide the details for " +
          temp.map(i => {
            return i + " ";
          }),
        toastConfig
      );
    }
  };

  handleReset = () => {
    this.setState({
      account_holder_name: "",
      account_no: "",
      confirm_account_no: "",
      ifsc_code: "",
      bank_name: "",
      branch_name: ""
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
                label="Account Holder Name *"
                validators={["required"]}
                errorMessages={"Please input your Account Holder name !"}
                type="text"
                placeholder="Account Holder Name"
                className="form-control"
                name="account_holder_name"
                onChange={this.handleInputChange}
                value={this.state.account_holder_name}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Account no. *"
                validators={["account_no", "required"]}
                type="number"
                className="form-control"
                name="account_no"
                onChange={this.handleInputChange_formData}
                value={this.state.account_no || formData.account_no}
                errorMessages={[
                  "Please provide valid account number",
                  "This field is mandatory"
                ]}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Re-enter Account no. *"
                validators={["isAccountNumberMatch", "required"]}
                type="number"
                className="form-control"
                name="confirm_account_no"
                onChange={this.handleInputChange_formData}
                value={
                  this.state.confirm_account_no || formData.confirm_account_no
                }
                errorMessages={[
                  "Account Number mismatch",
                  "This field is mandatory"
                ]}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="IFSC Code *"
                validators={["isIFSCMatch", "required"]}
                placeholder="IFSC Code "
                className="form-control"
                name="ifsc_code"
                onChange={this.handleInputChange}
                value={this.state.ifsc_code}
                type="text"
                pattern="/^-?\d+\.?\d*$/"
                errorMessages={[
                  "Please enter valid IFSC Code",
                  "Please enter your IFSC Code !"
                ]}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Bank Name*"
                validators={["required"]}
                type="text"
                placeholder="Bank Name"
                className="form-control"
                name="bank_name"
                onChange={this.handleInputChange}
                value={this.state.bank_name}
                errorMessages={"This field is mandatory !"}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Branch Name*"
                validators={["required"]}
                type="text"
                placeholder="Branch Name"
                className="form-control"
                name="branch_name"
                onChange={this.handleInputChange}
                value={this.state.branch_name}
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
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBankDetails: bankDetails => {
      dispatch(createTrainerBankDetails(bankDetails));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrainerBankDetails);
