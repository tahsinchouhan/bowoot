import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";

import { Toast } from "react-bootstrap";
class Notification extends React.Component {
  changeshow() {
    this.setState({
      show: false
    });
    this.props.history.replace("/login");
  }
  render() {
    return (
      <div className="gym-background background-watermark">
        <div className="container-fluid">
          <div className="row enroll_main">
            <div className="enroll_card col-sm-8 col-xs-8 col-md-8 col-lg-8">
              <div className="enroll-now-container">
                <Toast.Header onClick={() => this.changeshow()}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Error</strong>
                </Toast.Header>

                <Toast.Body>Please enter the valid credetials</Toast.Body>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Notification);
