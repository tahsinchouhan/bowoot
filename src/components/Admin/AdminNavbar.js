import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { firebase } from "../firebase/index";
import { withRouter } from "react-router-dom";

class AdminNavbar extends React.Component {
  render() {
    return (
      <Navbar className="nav-bar">
        <Nav>
          <Nav.Link href="/admin/adminDashboard" className="admin-logo">
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>ADMIN</span>
            <br />
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>BOWOOT</span>
          </Nav.Link>

          <div className="row">
            <div className="col">
              <Nav.Link href="" className="servie-link blogs-link">
                <span className="blog-link">BLOG</span>
              </Nav.Link>
            </div>

            <div className="col power_button">
              <Nav.Link
                className="servie-link"
                onClick={() => {
                  localStorage.clear();
                  this.props.logout();
                  this.props.history.replace("/");
                  firebase.auth().signOut();
                }}
              >
                <i
                  class="fa fa-power-off"
                  style={{ fontSize: "40px", marginTop: "-7px" }}
                  aria-hidden="true"
                ></i>
              </Nav.Link>
            </div>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(AdminNavbar);
