import React from "react";
import { firebase } from "./../firebase";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { RegisterService, UserPage } from "./../../actions/index";
import "../../css/userDashleft.css";
import UserServicesDisplay from "./UserServicesDisplay";
class UserDashRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultlastchild: ""
    };
  }
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const getRef = firebase
          .database()
          .ref("userServices")
          .child(user.uid);
        if (user) {
          getRef
            .endAt()
            .limitToLast(1)
            .on("child_added", function(snapshot) {
              let results_last_child = snapshot.val();
              self.setState({ resultlastchild: results_last_child });
            });
        }
      }
    });
  }
  render() {
    const resultantlastchild = this.state.resultlastchild;
    console.log("dghshd",resultantlastchild)
    return (
      <div className="padding_user_dash_center">
        {resultantlastchild ? 
        <span>
        <h3 className="shady_header2 font_ongoing">Ongoing Session</h3>
          <div className="ongoingSessionContainer modal-container-userdash col-sm-12">
            <div className="ongoing_contents">
              <div style={{color:"rgba(50,58,82,0.9)"}}>
              <span>
                {resultantlastchild.typeOfservice ? resultantlastchild.typeOfservice : null} TRIAL SESSION
              </span>&nbsp; | &nbsp;
              <span style={{color:"white"}}>
                {resultantlastchild.trial_date ?  new Date(resultantlastchild.trial_date).toDateString() : null} &nbsp;
               <span className="ongoing_time">({resultantlastchild.trial_time ? resultantlastchild.trial_time : null})</span> 
              </span>
              </div>
              <span style={{ color: "white", fontWeight: "600" }}>
                {resultantlastchild.status ? resultantlastchild.status : null}
              </span>
            </div>
        </div>
        </span>:null}
        <div>
          <div className="row">
            <div className="col-sm-12 maxwidthforuserdash ">
              <br />
              <h3 className="serviceheader">Services</h3>
              <UserServicesDisplay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return {
    User: State.sessionState.authUser,
    userRenderPage: State.userDetail.userpage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    typeOfService: services => {
      dispatch(RegisterService(services));
    },
    typeOfPage: userpage => {
      dispatch(UserPage(userpage));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDashRight)
);
