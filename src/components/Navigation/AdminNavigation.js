import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../css/UserNavigationCss.css";
const routes = {
  ADMINDASHBOARD: "/admin"
};

class AdminNavigation extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9"></div>
          <div className="col-sm-3">
            <div className="background">
              {this.props.user && this.props.user.TypeOfUser === "Admin" ? (
                <ul>
                  <li>
                    <Link to={routes.ADMINDASHBOARD}>AdminDashBoard</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        localStorage.clear();
                        this.props.logout();
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
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    user: State.userDetail.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AdminNavigation)
);
