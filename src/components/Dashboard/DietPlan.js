import React from "react";
import { withRouter } from "react-router-dom";
import "../../css/Dashboard.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { Card, Accordion } from "react-bootstrap";
import { capitalize } from "./../Custom/Capitalize";
class DietPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      resultlastchild: "",
      show: false
    };
  }
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const getRef = firebase
          .database()
          .ref("users")
          .child(user.uid)
          .child("dietPlan");
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
        getRef
          .endAt()
          .limitToLast(1)
          .on("child_added", function(snapshot) {
            let results_last_child = snapshot.val();
            self.setState({ resultlastchild: results_last_child });
          });
      }
    });
  }

  handleToggle = () => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const resultant = this.state.result;
    const resultantlastchild = this.state.resultlastchild;
    return (
      <div>
        <div className="veiw_all_diet" onClick={() => this.handleToggle()}>
          <Link>View all</Link>
        </div>
        {this.state.show ? (
          <div>
            {resultant
              ? Object.keys(resultant)
                  .reverse()
                  .map((item, i) => (
                    <div key={i}>
                      <div className="enroll-now-container border_design bg_color">
                        <div className="diet_content_width">
                          <div className="serviceDetails">
                            <div className="diet-container-column">
                              <div>
                                {resultant[item].plan ===
                                "KETOGENIC DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/keto.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan === "VEGAN DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/vegan.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "HEALTY LIFE STYLE DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/healthy.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "MUSCLE BUILDING OR WEIGHT GAIN DEIT PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/gain_weight.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "FOR WEDDING OR ANY SPECIAL FUNCTION" ? (
                                  <img
                                    src={require("../../assests/diet/wedding.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "DIET PLAN FOR SPECIAL MEDICAL CONDITIONS" ? (
                                  <img
                                    src={require("../../assests/diet/medical.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "INTERMITTENT FASTING DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/fasting.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "NUTRITIONAL ASSESSMENT + DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/nutritient.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "EXPERT COUNSELLING + CUSTOMIZED DIET PLAN" ? (
                                  <img
                                    src={require("../../assests/diet/custom.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan ===
                                "MUSCLE BUILDING    " ? (
                                  <img
                                    src={require("./../../assests/woman.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                                {resultant[item].plan === "WEIGHT LOSS   " ? (
                                  <img
                                    src={require("./../../assests/muscle.png")}
                                    style={{ width: "20%" }}
                                  />
                                ) : null}
                              </div>
                              <div>
                                <span>
                                  {resultant[item].plan
                                    ? capitalize(resultant[item].plan)
                                    : null}
                                </span>
                              </div>
                              <div>
                                <span>
                                  {resultant[item].fitnessplans
                                    ? capitalize(resultant[item].fitnessplans.workpreference)
                                    : resultant[item].trainerservice.diet
                                    ? capitalize(
                                        resultant[item].trainerservice.activity
                                      )
                                    : null}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span>
                                {resultant[item].fitnessplans
                                  ? capitalize(resultant[item].fitnessplans.goalreach)
                                  : resultant[item].trainerservice
                                  ? resultant[item].trainerservice.diet
                                  : null}
                              </span>
                            </div>
                          </div>
                          <div>Kindly check email for diet plan</div>
                        </div>
                      </div>
                    </div>
                  ))
              : null}
          </div>
        ) : (
          <div className="enroll-now-container border_design bg_color">
            <div className="diet_content_width">
              <div className="serviceDetails">
                <div className="diet-container-column">
                  <div>
                    {resultantlastchild.plan === "KETOGENIC DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/keto.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan === "VEGAN DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/vegan.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "HEALTY LIFE STYLE DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/healthy.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "MUSCLE BUILDING OR WEIGHT GAIN DEIT PLAN" ? (
                      <img
                        src={require("../../assests/diet/gain_weight.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "FOR WEDDING OR ANY SPECIAL FUNCTION" ? (
                      <img
                        src={require("../../assests/diet/wedding.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "DIET PLAN FOR SPECIAL MEDICAL CONDITIONS" ? (
                      <img
                        src={require("../../assests/diet/medical.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "INTERMITTENT FASTING DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/fasting.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "NUTRITIONAL ASSESSMENT + DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/nutritient.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan ===
                    "EXPERT COUNSELLING + CUSTOMIZED DIET PLAN" ? (
                      <img
                        src={require("../../assests/diet/custom.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan === "MUSCLE BUILDING    " ? (
                      <img
                        src={require("./../../assests/woman.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                    {resultantlastchild.plan === "WEIGHT LOSS   " ? (
                      <img
                        src={require("./../../assests/muscle.png")}
                        style={{ width: "20%" }}
                      />
                    ) : null}
                  </div>
                  <div>
                    <span>
                      {resultantlastchild.plan
                        ? capitalize(resultantlastchild.plan)
                        : null}
                    </span>
                  </div>
                  <div>
                    <span>
                      {resultantlastchild.fitnessplans
                        ? capitalize(resultantlastchild.fitnessplans.workpreference)
                        : resultantlastchild.trainerservice
                        ? capitalize(resultantlastchild.trainerservice.activity)
                        : null}
                    </span>
                  </div>
                </div>
                <div className="">
                  <span>
                    {resultantlastchild.fitnessplans
                      ? capitalize(resultantlastchild.fitnessplans.goalreach)
                      : resultantlastchild.trainerservice
                      ? resultantlastchild.trainerservice.diet
                      : null}
                  </span>
                </div>
              </div>
              <div>Kindly check email for diet plan</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userDetail
  };
};

export default withRouter(connect(mapStateToProps)(DietPlan));
