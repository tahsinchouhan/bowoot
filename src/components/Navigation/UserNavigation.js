import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firebase } from "../firebase";
import { compose } from "recompose";
import withAuthorization from "./../Session/withAuthorization";
import UserDashBoard from "../Dashboard";
import "../../css/UserNavigationCss.css";

class UserNavigation extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9"></div>
          <div className="col-sm-3">
            <div className="background">
              {this.props.user && this.props.user.TypeOfUser === "User" ? (
                <ul>
                  <li>
                    <Link to={"/user/userDashboard"}>UserDashBoard</Link>
                  </li>
                  <li>
                    <a
                      href={"/"}
                      onClick={() => {
                        this.props.logout();
                        localStorage.clear();
                        firebase.auth().signOut();
                        this.props.history.replace("/");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <UserDashBoard />
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser;

const mapStateToProps = State => {
  return {
    user: State.userDetail.user
  };
};

export default withRouter(
  compose(
    withAuthorization(condition),
    connect(mapStateToProps, null)(UserNavigation)
  )
);
