import React from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createTrainerProfDetails } from "../../actions/";
import "react-toastify/dist/ReactToastify.css";
import { firebase } from "./../firebase";
import { toastConfig } from "../Custom/ToastConfig";
import moment from "moment";
import CustomSpinner from "../Custom/spinner";
import Success from "./Success";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { functions_for_users } from "../../function_constant";

const FA = require("react-fontawesome");

class TrainerExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: props.trainer.experience,
      aadharURL: "",
      panURL: "",
      photoURL: "",
      certificateURL: "",
      loading: false,
      success: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  generatePassword() {
    return (
      Math.random()
        .toString(36)
        .slice(2) +
      Math.random()
        .toString(36)
        .slice(2)
    );
  }

  handleSubmit() {
    var self = this;
    let add = this.props.trainer;
    add.password = this.generatePassword();
    add.token = "isTrainer";

    if (this.state.experience) {
      self.setState({
        loading: true
      });
      this.postData(functions_for_users.creatNewUser, add)
        .then(user => {
          if (user) {
            Object.keys(this.props.trainer.documents).map(k => {
              if (self.props.trainer.documents[k]) {
                let storageRef = firebase
                  .storage()
                  .ref("trainers")
                  .child(user.uid);
                self.uploadFile(
                  k,
                  user.uid,
                  storageRef,
                  self.props.trainer.documents[k][0]
                );
              }
            });
          } else {
            self.setState({
              loading: false
            });
            toast(
              "There seems to be server error ! Kindly try again in some time",
              toastConfig
            );
          }
        })
        .catch(error => {
          self.setState({
            loading: false
          });
          toast(error.message, toastConfig);
        });
    } else {
      self.setState({
        loading: false
      });
      toast("Put NA for no experience", toastConfig);
    }
  }

  uploadFile(k, uid, path, fileTemp) {
    let te = moment().format("x"),
      self = this;
    path
      .child(te + fileTemp.name)
      .put(fileTemp)
      .then(snapshot => {
        let temp = [k] + "URL";
        snapshot.ref
          .getDownloadURL()
          .then(function(downloadURL) {
            self.setState({
              [temp]: downloadURL
            });
            self.props.onAddPost(self.state);
            if (
              (self.state.aadharURL && self.state.panURL,
              self.state.photoURL,
              self.state.certificateURL) !== ""
            ) {
              let tempProps = self.props.trainer;
              delete tempProps.password;
              firebase
                .database()
                .ref("/trainers/" + uid)
                .child("profile")
                .set(tempProps)
                .then(() => {
                  self.setState({
                    loading: false
                  });
                  self.props.onSubmit();
                });
            }
          })
          .catch(error => {
            toast(error.message, toastConfig);
          });
      });
  }

  postData(url = ``, data) {
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => resolve(response.json()))
        .catch(err => {
          reject(err);
        }); // parses response to JSON
    });
  }

  handleReset = () => {
    this.setState({
      experience: ""
    });
  };

  render() {
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="form-group">
            <TextValidator
              type="text"
              placeholder="Experience *"
              className="form-control"
              name="fname"
              validators={["required"]}
              placeholder="Experience"
              className="form-control"
              name="experience"
              errorMessages={"This field is mandatory! "}
              onChange={this.handleInputChange}
              value={this.state.experience}
            />
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
          <ToastContainer transition={Flip} />
        </ValidatorForm>
        <ToastContainer transition={Flip} />
        {this.state.loading ? (
          <CustomSpinner
            spinnerVal={true}
            val="Creating Your Profile ! It may take a while "
          />
        ) : null}
        {this.state.success ? <Success /> : null}
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: prof => {
      dispatch(createTrainerProfDetails(prof));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrainerExperience)
);
