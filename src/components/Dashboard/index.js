import React from "react";
import { withRouter, Link } from "react-router-dom";
import { firebase } from "./../firebase";
import { connect } from "react-redux";
import UserDashRight from "./UserDashRight";
import { UserPage, onLogout, userLoginDetails } from "./../../actions/index";

import EditProfile from "./EditProfile";
import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import DietPlan from "./DietPlan";
import Diet from "../Landing/Diet";
import TicketRaised from "./TicketRaised";
import Transactions from "./Transactions";
import BookSession from "../BookSession";

class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Dashboard",
      user: [],
      toggle: false,
      scrolled: false,
      currentLatLng: {
        lat: 0,
        lng: 0
      }
    };
  }

  componentDidMount() {
    let self = this;
    this.showCurrentLocation();
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
      firebase
        .database()
        .ref("users")
        .child(user.uid)
        .child("profile")
        .on("value", function(snapshot) {
          self.props.storeProfile(snapshot.val());
        });
      }
    });
  }

  async signout() {
    await firebase.auth().signOut();
    this.props.history.replace("/");
    window.location.reload();
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      console.log("error");
    }
  };
  dashboard = () => {
    this.props.typeOfPage("Dashboard");
    this.renderPage();
  };
  transaction = () => {
    this.props.typeOfPage("Transaction");
    this.renderPage();
  };
  renderPage = () => {
    let user = this.props.userRenderPage;
    this.setState({
      page: user
    });
  };
  render() {
    return (
      <div className="background-watermark">
        <React.Fragment>
          <SideNav className="sidebarposition">
            <NavItem
              onClick={() => this.props.history.push("/")}
              style={{
                fontSize: "25px",
                color: "white",
                marginTop: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <NavIcon className="user_dash_logo">
                <img
                  src={require("../../assests/bowoot_green_icon.png")}
                  style={{ width: "3rem" }}
                />
              </NavIcon>
            </NavItem>
            <SideNav.Nav defaultSelected="Dashboard">
              <NavItem
                eventKey="Dashboard"
                onClick={() => this.props.typeOfPage("Dashboard")}
              >
                <NavIcon>
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
              </NavItem>
              <NavItem
                eventKey="Transaction"
                onClick={() => this.props.typeOfPage("Transaction")}
              >
                <NavIcon>
                  <i
                    className="fa fa-fw  fa-credit-card-alt"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
              </NavItem>
              <NavItem
                eventKey="Ticket"
                onClick={() => this.props.typeOfPage("Ticket")}
              >
                <NavIcon>
                  <i
                    className="fa fa-fw fa-ticket"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
              </NavItem>
              <NavItem eventKey="/" onClick={() => this.signout()}>
                <NavIcon>
                  <i
                    className="fa fa-fw fa-sign-out"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
          <main>
            <div className="row colum_reverse_Mq">
              <div className="col-xs-4 col-sm-4 col-md-6 col-lg-8 ongoingHeading">
                {this.props.userRenderPage === "Dashboard" ? (
                  <UserDashRight />
                ) : null}
                {this.props.userRenderPage === "Transaction" ? (
                  <Transactions />
                ) : null}
                {/* {this.props.userRenderPage === "Ticket" ? (
                  <TicketRaised />
                ) : null} */}
                {this.props.userRenderPage === "Fitness" ||
                this.props.userRenderPage === "Yoga" ? (
                  <BookSession />
                ) : null}
                {this.props.userRenderPage === "Diet" ? <Diet /> : null}

                {this.props.userRenderPage === "Edit" ? <EditProfile /> : null}
              </div>
              {this.props.userRenderPage === "BookSession" ||
              this.props.userRenderPage === "ChooseDietPlan" ||
              this.props.userRenderPage === "Ticket" ? null : (
                <div className="col-lg-3 col-xs-4 col-sm-4 col-md-5 user_right_end_container">
                  <div>
                    <a
                      className="blog_mq"
                      style={{ paddingLeft: "285px", color: "#a5f545" }}
                      href="/"
                    >
                      Blog
                    </a>
                  </div>
                  <div className="book_diet_button">
                    <div
                      className="booksession_right_end"
                      onClick={() => this.props.typeOfPage("BookSession")}
                    >
                      <Link>Book Session</Link>
                    </div>
                    <div
                      className="choose_Diet_right_end"
                      onClick={() => this.props.typeOfPage("ChooseDietPlan")}
                    >
                      <Link>Choose New Diet Plans</Link>
                    </div>
                  </div>
                  <div className="col-sm-12 maxwidthforuserdash dietplan_user_dash_mq">
                    <div className=" ">
                      <h3 className="dietPlanHeading">Active Diet Plan</h3>
                      <center>
                        <DietPlan />
                      </center>
                    </div>
                  </div>
                </div>
              )
              }
              {this.props.userRenderPage === "BookSession" ? (
                <BookSession />
              ) : null}
              {this.props.userRenderPage === "ChooseDietPlan" ? <Diet /> : null}
              {this.props.userRenderPage === "Ticket" ? <TicketRaised /> : null}
            </div>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    user: State.userDetail,
    userRenderPage: State.userDetail.userpage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    typeOfPage: userpage => {
      dispatch(UserPage(userpage));
    },
    logout: data => {
      dispatch(onLogout());
    },
    storeProfile: data => {
      dispatch(userLoginDetails(data));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)
);
