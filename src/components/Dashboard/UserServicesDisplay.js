import React from "react";
import { withRouter } from "react-router-dom";
import "../../css/Dashboard.css";
import { connect } from "react-redux";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import DietPlan from "./DietPlan";
import { capitalize } from "./../Custom/Capitalize";

class UserServiceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      show: false
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
      }
    });
  }

  render() {
    const resultant = this.state.result;
    return (
      <div>
        {resultant
          ? Object.keys(resultant)
              .reverse()
              .map((item, i) => (
                <div>
                  {resultant[item].typeOfservice ? 
                <div key={i} className="user_service_display_container">
                  <div style={{ width: "100%" }}>
                    <div className="user_dash_service_trainer">
                      <span>Asssigned Trainer :</span>
                      <span>Contact no :</span>
                      <span>Ratings :</span>
                    </div>
                    <div className="container-row-service padding_service col-sm-12">
                      <div className="image_service">
                        {resultant[item].typeOfservice === "FITNESS" ? (
                          <img
                            src={require("./../../assests/asset1.png")}
                            alt="asset1"
                            width="80px"
                          />
                        ) : (
                          <img
                            src={require("./../../assests/yoga.png")}
                            alt="asset1"
                            width="80px"
                          />
                        )}
                        <div className="service_display ">
                          <div className="service_package">
                            <span className="service_font">
                              {resultant[item].typeOfservice
                                ? resultant[item].typeOfservice
                                : null}
                            </span>
                            <span className="trainer_package">
                              {resultant[item].trainer_category
                                ? resultant[item].trainer_category
                                : null}
                            </span>
                          </div>
                          <span className="service_date_time">
                            {resultant[item].trial_date
                              ? new Date(
                                  resultant[item].trial_date
                                ).toDateString()
                              : null}</span>
                           <span> {resultant[item].trial_time
                              ? resultant[item].trial_time
                              : null}
                          </span>
                          <span className="price_user_dash">
                            Package price : <span>&#8377;4999</span>
                          </span>
                        </div>
                      </div>

                      <div className="service_amount_paid">
                        <span className="font-size-amount">
                          &#8377;
                          {resultant[item].bookamount
                            ? resultant[item].bookamount
                            : null}
                        </span>
                        <span>
                          {resultant[item].typeOfservice
                            ? resultant[item].typeOfservice
                            : null}
                        </span>
                        <span className="trial">(TRIAL SESSION)</span>
                      </div>
                    </div>
                    <div className="transaction_container">
                      <span>Transaction ID - "{item}"</span>
                      <span>
                        {resultant[item].assistance === "forothers" ? (
                          <span className="forothers_dash">
                            <span> For - {resultant[item].name}</span>
                            <span>({resultant[item].phone})</span>
                          </span>
                        ) : (
                          <span>For - SELF</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                </div>
                :null}
                </div>
              ))
          : null}
      </div>
    );
  }
}
export default withRouter(UserServiceDisplay);
