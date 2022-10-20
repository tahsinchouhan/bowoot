import React, { Component } from "react";
import { Card, Accordion } from "react-bootstrap";
import UserDashRight from "./UserDashRight";
import "../../css/Dashboard.css";

const firebase = require("firebase");

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      const getRef = firebase
        .database()
        .ref("userServices")
        .child(user.uid);
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
    });
  }

  render() {
    const resultant = this.state.result;
    return (
      <div>
        <div className="gym-background background-watermark">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-10">
                <h3 className="shady_header">Transactions</h3>

                <Accordion defaultActiveKey="0">
                  {resultant
                    ? Object.keys(resultant).map((item, i) => (
                        <div
                          key={i}
                          className="enroll-now-container border_design"
                        >
                          <div style={{ width: "100%" }}>
                            <Accordion.Toggle
                              as={Card.Header}
                              eventKey={i}
                              className="cardheader"
                            >
                              <div className="container-row-service">
                                <span>Payment-id {item}</span>
                                <span>
                                  <span className="dottinproductinfo_toggle">
                                    <i className="fa fa-chevron-down"></i>
                                  </span>
                                </span>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={i}>
                              <Card.Body>
                                <div> Amount-{resultant[item].amount}</div>
                                <div>
                                  TypeofService-{resultant[item].service}
                                </div>
                                <div> Time-{resultant[item].time}</div>
                                <div> Package-{resultant[item].trainer}</div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </div>
                        </div>
                      ))
                    : null}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
