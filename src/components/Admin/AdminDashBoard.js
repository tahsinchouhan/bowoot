import React from "react";
import { firebase } from "../firebase/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import RightBar from "./RightBar";
import Home from "./Home";
import Trainers from "./Trainers";
import Users from "./Users";
import History from "./History";
import Reviews from "./Reviews";
import PushNotification from "./PushNotification";
import TicketRaised from "./TicketRaised";
import "../../css/Admin.css";

class AdminDashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      pageRender: "home",
      version: "",
      show: true
    };
  }

  componentDidMount() {
    var data = require("./../../../package.json");
    this.setState({
      version: data.version
    });
  }

  handleClick = e => {
    this.setState({
      pageRender: e.target.id
    });
  };

  async signout() {
    await firebase.auth().signOut();
    console.log(this.props);
    // this.props.history.replace("/");
    window.location.reload();
  }

  render() {
    let active = {
      backgroundColor: "#bbfc6f",
      borderRight: "5px solid #14900f"
    };
    let activeIcon = {
      marginTop: "-15px",
      fontSize: "24px",
      color: "#14900f"
    };
    let icon = {
      marginTop: "-15px",
      fontSize: "24px"
    };
    let activeText = {
      color: "black"
    };
    return (
      <div>
        <AdminNavbar logout={this.signout} />
        <button
          onClick={() =>
            this.state.show
              ? this.setState({ show: false })
              : this.setState({ show: true })
          }
          className="hideButton"
        >
          <i class="fa fa-bars"></i>
        </button>
        <div className="row">
          <div
            className="col-sm-2 color left-column"
            id={this.state.show ? "open" : "close"}
          >
            <div className="account-logo">
              <h5>ACCOUNTS</h5>
            </div>

            {this.state.pageRender === "home" ? (
              <div
                className="row menu"
                id="home"
                onClick={this.handleClick}
                style={active}
              >
                <i class="fa fa-home" style={activeIcon} id="home"></i>
                <span style={activeText} id="home">
                  Home
                </span>
              </div>
            ) : (
              <div className="row menu" id="home" onClick={this.handleClick}>
                <i class="fa fa-home" style={icon} id="home"></i>Home
              </div>
            )}

            {this.state.pageRender === "trainers" ? (
              <div
                className="row menu"
                id="trainers"
                onClick={this.handleClick}
                style={active}
              >
                <i class="fa fa-bicycle" style={activeIcon} id="trainers"></i>
                <span style={activeText} id="trainers">
                  Trainers
                </span>
              </div>
            ) : (
              <div
                className="row menu"
                id="trainers"
                onClick={this.handleClick}
              >
                <i class="fa fa-bicycle" style={icon} id="trainers"></i>Trainers
              </div>
            )}

            {this.state.pageRender === "users" ? (
              <div
                className="row menu"
                id="users"
                onClick={this.handleClick}
                style={active}
              >
                <i className="fa fa-users" style={activeIcon} id="users"></i>
                <span style={activeText} id="users">
                  Users
                </span>
              </div>
            ) : (
              <div className="row menu" id="users" onClick={this.handleClick}>
                <i className="fa fa-users" style={icon} id="users"></i>Users
              </div>
            )}

            {this.state.pageRender === "history" ? (
              <div
                className="row menu"
                id="history"
                onClick={this.handleClick}
                style={active}
              >
                <i class="fa fa-history" style={activeIcon} id="history"></i>
                <span style={activeText} id="history">
                  History
                </span>
              </div>
            ) : (
              <div className="row menu" id="history" onClick={this.handleClick}>
                <i class="fa fa-history" style={icon} id="history"></i>History
              </div>
            )}

            {this.state.pageRender === "reviews" ? (
              <div
                className="row menu"
                id="reviews"
                onClick={this.handleClick}
                style={active}
              >
                <i
                  className="fa fa-pencil-square"
                  style={activeIcon}
                  id="reviews"
                ></i>
                <span style={activeText} id="reviews">
                  Reviews
                </span>
              </div>
            ) : (
              <div className="row menu" id="reviews" onClick={this.handleClick}>
                <i
                  className="fa fa-pencil-square"
                  style={icon}
                  id="reviews"
                ></i>
                Reviews
              </div>
            )}

            {/* this.state.pageRender==="notification"?
                <div className="row menu" id="notification" onClick={this.handleClick} style={active}>
                  <i className="fa fa-bell" style={activeIcon} id="notification"></i><span style={activeText} id="notification">Push Notification</span>
                </div>
                :
                <div className="row menu" id="notification" onClick={this.handleClick}>
                  <i className="fa fa-bell" style={icon} id="notification"></i>Push Notification
                </div>
          */}

            <div className="account-logo">
              <h5>SUPPORT</h5>
            </div>

            {this.state.pageRender === "ticket" ? (
              <div
                className="row menu"
                id="ticket"
                onClick={this.handleClick}
                style={active}
              >
                <i className="fa fa-ticket" style={activeIcon} id="ticket"></i>
                <span style={activeText} id="ticket">
                  Ticket Raised
                </span>
              </div>
            ) : (
              <div className="row menu" id="ticket" onClick={this.handleClick}>
                <i className="fa fa-ticket" style={icon} id="ticket"></i>Ticket
                Raised
              </div>
            )}

            <div className="row logo-pad">
              <div className="logo">
                <img
                  src={require("./../../assests/bowoot_icon.png")}
                  className="logo_image"
                />
              </div>
              <div className="version">V {this.state.version}</div>
              <div className="version">v {this.state.version}</div>
            </div>
          </div>

          <div className="col">
            <div className="row scroll scrolls">
              {this.state.pageRender === "home" ? <Home /> : null}
              {this.state.pageRender === "home" ? <RightBar /> : null}
              {this.state.pageRender === "trainers" ? <Trainers /> : null}
              {this.state.pageRender === "users" ? <Users /> : null}
              {this.state.pageRender === "history" ? <History /> : null}
              {this.state.pageRender === "reviews" ? <Reviews /> : null}
              {this.state.pageRender === "notification" ? (
                <PushNotification />
              ) : null}
              {this.state.pageRender === "ticket" ? <TicketRaised /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminDashBoard);
