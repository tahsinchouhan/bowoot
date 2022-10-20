import React from "react";
import firebase from "firebase";
import { Card, Accordion } from "react-bootstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast, Flip } from "react-toastify";
import "../../css/ticketRaise.css";
import RaisedTicketDisplay from './RaisedTicketDisplay';
import { toastConfig } from "../Custom/ToastConfig";
import { createTicket } from "../../actions/index";
import { connect } from "react-redux";
import moment from "moment";
import { object } from "prop-types";
let loading;
class TicketRaised extends React.Component {
  state = {
    result: "",
    ticket_raise_message: "",
    ticket_raise_file: "",
    ticket_raise_file_url: "",
    ticket_id: "",
    status:"Pending"
  };
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const getRef = firebase
          .database()
          .ref("userServices")
          .child(user.uid);
        if (user) {
          getRef.on(
            "value",
            snapshot => {
              let results = snapshot.val();
              self.setState({ result: results });
            },
            function(errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
        }
      }
    });
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({ [e.target.name]: [e.target.files[0]] });
    }
  };
  handleClickChange = e => {
    this.setState({
      ticket_id: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    var self = this;
    var user = firebase.auth().currentUser;
    if (this.state.ticket_raise_file && this.state.ticket_id) {
      let storageRef = firebase
        .storage()
        .ref("userServices")
        .child(user.uid)
        .child(self.state.ticket_id)
        .child("raisedTicket");
      self.uploadFile(user.uid, storageRef, this.state.ticket_raise_file[0]);
    } else if (this.state.ticket_raise_message) {
      let data = {};
      data = Object.assign({}, this.state);
      delete data.result;
      let storageRef = firebase
        .database()
        .ref("userServices")
        .child(user.uid)
        .child(self.state.ticket_id)
        .child("raisedTicket");
      storageRef.push(data).then(() => {
        self.handleReset();
      });
    } else {
      toast(
        "There seems to be problem with server ! Kindly try again",
        toastConfig
      );
    }
  };
  uploadFile = (uid, path, fileTemp) => {
    let te = moment().format("x"),
      self = this;
    var user = firebase.auth().currentUser;
    path
      .child(te + fileTemp.name)
      .put(fileTemp)
      .then(snapshot => {
        console.log("hdgh", snapshot);
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          self.setState({
            ticket_raise_file_url: downloadURL
          });
          let data = {};
          data = Object.assign({}, self.state);
          delete data.result;
          let storageRef = firebase
            .database()
            .ref("userServices")
            .child(user.uid)
            .child(self.state.ticket_id)
            .child("raisedTicket");
          storageRef.push(data);
          self.handleReset();
        });
      });
  };
  handleReset = () => {
    this.setState({
      ticket_raise_message: "",
      ticket_raise_file: "",
      ticket_raise_file_url: "",
      result: ""
    });
  };
  render() {
    const resultant = this.state.result;
    return (
      <div className="ticke_container_margin col-sm-12">
        <h2 className="shady_header">
          <strong className="iconsheading">
            Ticket Raise
          </strong>
        </h2>
        <div class="row">
        <div class="col-sm-8">
            <RaisedTicketDisplay />
            </div>
            <div class="col-sm-3">
        <select onChange={this.handleClickChange}>
          <option disabled selected value> -- select service -- </option>
          {resultant
            ? Object.keys(resultant).map(item => {
                return (
                  resultant[item].typeOfservice ? 
                  <option value={resultant[item].TransactionId}>
                    {resultant[item].typeOfservice ? resultant[item].typeOfservice : null}&nbsp; - &nbsp;
                    {resultant[item].bookamount ? resultant[item].bookamount :null}&nbsp; - &nbsp;
                    {resultant[item].trial_date
                      ? new Date(resultant[item].trial_date).toDateString()
                      : null}
                    {resultant[item].trial_time
                      ? resultant[item].trial_time
                      : null}
                  </option> : null
                );
              })
            : null}
        </select>
        <div>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextValidator
                placeholder="Message"
                className="form-control ticket"
                name="ticket_raise_message"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.ticket_raise_message}
                label="Message *"
                validators={["required"]}
                errorMessages={"This field is mandatory!"}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-2" style={{ color: "grey" }}>
                  file:
                </div>

                <div
                  className="col-sm-6 file-input"
                  style={{ display: "flex" }}
                >
                  <input
                    type="file"
                    id="ticket_raise_file"
                    name="ticket_raise_file"
                    className="custom-file-input"
                    onChange={this.handleChange}
                  />
                  <label
                    for="ticket_raise_file"
                    className="btn-2"
                    id="certificate"
                  >
                    Choose a file
                  </label>
                </div>
                {this.state.ticket_raise_file
                  ? this.state.ticket_raise_file[0].name
                  : null}
              </div>
            </div>
            <div className="form-group">
              <div className="inputfield">
                <button type="submit" className="buttonsubmit">
                  Proceed
                </button>
              </div>
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
  return { ticket: State.userDetail.ticket };
};
const mapDispatchToProps = dispatch => {
  return {
    createTicketRaise: ticket => dispatch(createTicket(ticket))
  };
};

export default connect(null, mapDispatchToProps)(TicketRaised);
