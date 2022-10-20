import React from "react";
import TrainerDocuments from "../TrainerRegistrations/TrainerDocuments";
import TrainerExperience from "../TrainerRegistrations/TrainerExperience";
import TrainerDetails from "../TrainerRegistrations/TrainerDetails";
import TrainerBankDetails from "../TrainerRegistrations/TrainerBankDetails";
import { connect } from "react-redux";
import { updateStep, userLoginDetails } from "../../actions/index";
import { firebase } from "../firebase";
import Typeoftrainer from "./Typeoftrainer";
import Success from "./Success";
import TrainerBasicDetails from "./TrainerBasicDetails";

import "../../css/Trainer.css";
import { ProgressBar } from "react-bootstrap";
class TrainerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [{}, {}, {}, {}, {}, {}, {}]
    };
  }

  nextPage = () => {
    this.props.updateStep(this.props.page + 1);
  };

  previousPage = () => {
    this.props.updateStep(this.props.page - 1);
  };

  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .child("profile")
          .on("value", function(snapshot) {
            console.log(snapshot.val());
            self.props.storeProfile(snapshot.val());
          });
      }
    });
  }

  render() {
    const { page } = this.props;
    return (
      <div className="background-watermark">
        <div className="trainer_background"></div>
        <h2 className="shady_header">
          <strong className="iconsheading">Become A Trainer Partner</strong>
        </h2>
        <a href="/" className="trainer_home">
          <strong>Home</strong>
        </a>
        <div className="trainer_container box-image col-sm-5 col-md-5 col-xl-5 col-lg-5">
          <div className="trainer_header_container">
            <h5>
              <strong>Trainer Registration</strong>
            </h5>
          </div>
          <ProgressBar
            now={(this.props.page * 100) / 6}
            className="progressStyle"
          />
          <div className=" trainer_box_mq col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <br />
            {page === 0 && <Typeoftrainer onSubmit={this.nextPage} />}
            {page === 1 && (
              <TrainerBasicDetails
                onSubmit={this.nextPage}
                previousPage={this.previousPage}
              />
            )}
            {page === 2 && (
              <TrainerDetails
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 3 && (
              <TrainerDocuments
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 4 && (
              <TrainerBankDetails
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {page === 5 && (
              <TrainerExperience
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
              />
            )}
            {(page === 9 || page === 8 || page === 7 || page === 6) && (
              <Success />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    page: State.trainerInfo.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStep: step => {
      dispatch(updateStep(step));
    },
    storeProfile: data => {
      dispatch(userLoginDetails(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainerRegistration);
