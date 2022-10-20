import React from "react";
import { withRouter } from "react-router-dom";
import "../../css/Dashboard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Image } from "react-bootstrap";
import DietPlan from "./DietPlan";
import Home from "./Home";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const getRef = firebase
          .database()
          .ref("users")
          .child(user.uid)
          .child("profile");
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
      } else return <Home />;
    });
  }

  render() {
    const resultant = this.state.result;
    return (
      <div>
        <div className="profile-Bucket">
          <div className="form-group">
            <div className=""></div>
            <div>
              {resultant ? (
                <div>
                  {resultant.image ? (
                    <img src={require(resultant.image)} className="avatarimg" />
                  ) : (
                    <img
                      src={require("../../assests/user.png")}
                      className="avatarimg"
                    />
                  )}
                  <div>
                    <div>{resultant.name}</div>
                    <div>{resultant.phoneNumber}</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userDetail
  };
};

export default withRouter(connect(mapStateToProps)(Profile));
