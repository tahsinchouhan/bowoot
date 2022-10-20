import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import { firebase } from "../firebase";
import { RegisterService, onLogout } from "./../../actions/index";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false
    };
  }

  listenScrollEvent = e => {
    if (window.scrollY > 24) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };
  MobileScrollEvent = e => {
    if (window.innerWidth < 768) {
      this.setState({ scrolled: false });
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    // this.MobileScrollEvent();
  }
  navfitnessUser = () => {
    this.props.typeOfService("FITNESS");
    this.props.history.push("/service/fitnesstrainer");
    if (this.props.User) {
      this.props.history.replace("/booksession");
    }
  };
  navYogaUser = () => {
    this.props.typeOfService("YOGA");
    this.props.history.push("/service/yogatrainer");
    if (this.props.User) {
      this.props.history.replace("/booksession");
    }
  };
  navDietUser = () => {
    this.props.typeOfService("DIET");
    this.props.history.push("/diet");
  };

  async signout() {
    await firebase.auth().signOut();
    this.props.history.replace("/");
    window.location.reload();
  }

  render() {
    return (
      <Navbar
        expand="lg custom"
        className={this.state.scrolled ? "custom-navbar-color" : null}
      >
        <Navbar.Brand className="home col-xs-6">
          {/* col-sm-6 col-md-3 col-lg-3  */}
          <a href="/" className={this.state.scrolled ? "bowoot" : "logo-bg"}>
            <img
              className="bowootheadericon"
              src={require("../../assests/bowoot_icon.png")}
            />
            BOWOOT
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>

          <Nav>
            <NavDropdown
              title="Services"
              id="basic-nav-dropdown"
              className="servie-link"
            >
              <NavDropdown.Item onClick={() => this.navfitnessUser()}>
                Fitness Trainer@Home
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.navYogaUser()}>
                Yoga Trainer@Home
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.navDietUser()}>
                Diet Plans
              </NavDropdown.Item>
              <NavDropdown.Item href="/fitnessplan">
                Fitness Plans
              </NavDropdown.Item>
              <NavDropdown.Item href="/institute">
                Become A Personal Trainer/Nutritionist
              </NavDropdown.Item>
              <NavDropdown.Item href="/shopnow">
                Shop Now (Coming soon)
              </NavDropdown.Item>
              <NavDropdown.Item href="/foodzone">
                Food Zone (Coming soon
              </NavDropdown.Item>
            </NavDropdown>
            {/* {this.props.typeofuser==="User"&& "Trainer"?null:( */}
            {this.props.User ? null : (
              <Nav.Link href="/trainer" className="servie-link">
                Become a Trainer Partner
                <br />
                <p className="header1 service-link">(Signup for Trainers)</p>
              </Nav.Link>
            )}
            {this.props.User ? (
              <Nav.Link href="/user/userDashboard" className="servie-link">
                Dashboard
              </Nav.Link>
            ) : null}
            {this.props.User ? (
              <Nav.Link
                className="servie-link"
                onClick={() => {
                  this.signout();
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => this.props.history.push("/login")}
                className="servie-link"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = State => {
  return {
    User: State.sessionState ? State.sessionState.authUser : null,
    typeofuser: State.userDetail.TypeofUser
      ? State.userDetail.TypeofUser
      : null,
    user: State.userDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    typeOfService: services => {
      dispatch(RegisterService(services));
    },
    logout: data => {
      dispatch(onLogout());
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
