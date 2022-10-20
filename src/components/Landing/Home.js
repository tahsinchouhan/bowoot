import React from "react";
import Footer from "../Footer/Footer";
import Testimonials from "./Testimonials";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./../../css/Home.css";
import "./../../css/howitworks.css";
import "./../../css/icon_flat.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../Header";
import { Modal } from "react-bootstrap";
import { firebase } from "../firebase";
import {
  RegisterService,
  SplashState,
  userLoginDetails,
  Description,
  type_of_diet
} from "./../../actions/index";
import Splash from "../Custom/Splash";
import Requestform from "./Requestform";
import HowitWorks from "./HowitWorks";
import HowitWorks_Onclick from "./HowitWorks_Onclick";
import CorporatePlan from "./CorporatePlan";
import { functions_for_users } from "../../function_constant";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: true,
      howitworks_onclick: false,
      showCorporate: false
    };
  }

  fitnessService = () => {
    this.props.typeOfService("FITNESS");
    this.showhowitworks();
  };
  dietService = () => {
    this.props.typeOfService("DIET");
    if (firebase.auth().currentUser) {
      this.props.getdescription();
    } else {
      this.props.getdescription("some content");
    }

    this.props.history.push("/diet");
  };
  yogaService = () => {
    this.props.typeOfService("YOGA");
    this.showhowitworks();
  };

  showhowitworks() {
    this.setState({
      view: true
    });
  }

  changeview() {
    this.setState({
      view: false
    });
  }

  requestform() {
    this.setState({
      show: true
    });
  }
  changeshow() {
    this.setState({
      show: false,
      showCorporate: false
    });
  }

  callcorporate() {
    this.setState({
      showCorporate: true
    });
  }

  showHowitWorks_OnclickModal() {
    this.setState({
      howitworks_onclick: true
    });
  }
  hideHowitWorks_Onclick() {
    this.setState({
      howitworks_onclick: false
    });
  }
  dietplantypes = e => {
    // alert(e.target.id);
    this.props.diet_plan(e.target.id);
    this.props.history.push("/diet");
  };

  componentDidMount() {
    let self = this;
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user && !self.props.service) {
    //     self
    //       .postData(functions_for_users.typeOfUser, { uid: user.uid })
    //       .then(data => {

    //         firebase
    //           .database()
    //           .ref("users")
    //           .child(user.uid)
    //           .child("profile")
    //           .on("value", function(snapshot) {
    //             self.props.storeProfile(snapshot.val());
    //           });
    //         if (data.result === "User" || self.props.User.userDetail.userpage) {
    //           switch (self.props.service) {
    //             case "FITNESS":
    //               return self.props.history.push("/booksession");
    //             case "YOGA":
    //               return self.props.history.push("/booksession");
    //           }
    //         }
    //       });
    //   } else {
    //     setTimeout(() => {
    //       self.setState({
    //         timer: false
    //       });
    //       self.props.splashState(self.state.timer);
    //     }, 3000);
    //   }
    // });
  }

  postData(url = ``, data) {
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => resolve(response.json()))
        .catch(err => {
          reject(err);
        }); // parses response to JSON
    });
  }

  render() {
    return (
      <div>
        {this.state.timer === true && this.props.splashState === true ? (
          <Splash />
        ) : (
          <div className="gym-background background-watermark">
            <div id="landing">
              <Header />
              <section className="container-fluid">
                <div className="row">
                  <div className="enroll_main col-sm-8">
                    <div className="enroll_card ">
                      <div className="enroll-now-container col-sm-12">
                        <img
                          src={require("./../../assests/asset1.png")}
                          alt="asset1"
                        />

                        <div className="container-column">
                          <p className="enroll_label_header">
                            Get fitter | Healthier | Happier
                          </p>
                          <p className="enroll_label">Fitness Trainer @ Home</p>
                          <a
                            className="enroll_button"
                            onClick={() => this.fitnessService()}
                          >
                            Enroll Now
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="enroll_card ">
                      <div className="enroll-now-container col-sm-12">
                        <img
                          src={require("./../../assests/apple.png")}
                          alt="asset1"
                        />
                        <div className="container-column">
                          <p className="enroll_label_header">
                            A Balanced Diet Works Wonders !
                          </p>
                          <p className="enroll_label">
                            Diet Plans & Cardio Fitness
                          </p>
                          <a
                            className="enroll_button"
                            onClick={() => this.dietService()}
                          >
                            Enroll Now
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="enroll_card ">
                      <div className="enroll-now-container col-sm-12">
                        <img
                          src={require("./../../assests/yoga.png")}
                          alt="asset1"
                        />
                        <div className="container-column">
                          <p className="enroll_label_header">
                            Discover your inner peace with Yoga!
                          </p>
                          <p className="enroll_label">Yoga Trainer @ Home</p>
                          <a
                            className="enroll_button"
                            onClick={() => this.yogaService()}
                          >
                            Enroll Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 yogalady">
                    <img
                      src={require("./../../assests/landing.png")}
                      style={{ width: "100%", opacity: "0.8" }}
                    />
                  </div>
                  {this.state.show ? null : (
                    <span className="requestformalignmentformobile">
                      <a
                        className="requestformalignment"
                        onClick={() => this.requestform()}
                      >
                        <img
                          src={require("./../../assests/conversation.png")}
                        />
                      </a>
                    </span>
                  )}
                </div>
              </section>
            </div>

            <section className="container gym-background">
              <h2 className="">
                <strong className="iconsheading">
                  Fitness | Yoga | Diet - All at your door step
                </strong>
              </h2>
              <div className="home4">
                <div className="row home8">
                  <div
                    className="iconsallignment "
                    onClick={() => this.fitnessService()}
                  >
                    <i className="flaticon-reduce-waist icons_intro"></i>
                    <p className="iconText">Fitness Trainer @ Home</p>
                  </div>
                  <div
                    className="iconsallignment"
                    onClick={() => this.callcorporate()}
                  >
                    <i className="flaticon-running-on-machine icons_intro"></i>
                    <p className="iconText">
                      Corporate Trainers,Just one click away!
                    </p>
                  </div>
                  <div
                    className="iconsallignment "
                    onClick={() => this.yogaService()}
                  >
                    <i className="flaticon-warming-up icons_intro"></i>
                    <p className="iconText">Yoga Trainer @ Home</p>
                  </div>
                  <div className="iconsallignment ">
                    <a href="/diet">
                      <i className="flaticon-apple-measure icons_intro"></i>
                      <p className="iconText">
                        Effective Diets in @ractive Prices
                      </p>
                    </a>
                  </div>
                  <div className="iconsallignment ">
                    <a href="/institute">
                      <i className="flaticon-medical-diet-page icons_intro"></i>
                      <p className="iconText">
                        Study with us and become a trainer partner
                      </p>
                    </a>
                  </div>
                  <div className="iconsallignment ">
                    <a>
                      <i className="flaticon-bottle-with-heart icons_intro"></i>
                      <p className="iconText">Shop Now (coming Soon)</p>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <br />
              <div className="container">
                <h2 className="">
                  <strong className="howitworksheading">How it Works?</strong>
                </h2>
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col weightLiftingLady container">
                    <img
                      src={require("./../../assests/womanlift.gif")}
                      alt="asset1"
                      className="image-gif "
                    />
                  </div>
                  <div className="right col-sm-6" className="pickservice"></div>
                  <div className="col">
                    <div className="pickservice">
                      <div className="app_inner">
                        <input id="tab-1" name="buttons" type="radio"></input>
                        <label for="tab-1">
                          <div
                            className="app_inner__tab enroll-now-container"
                            style={{
                              alignItems: "flex-start",
                              justifyContent: "space-between"
                            }}
                          >
                            <h2>Pick Your Service</h2>

                            <div className="trial">
                              {" "}
                              <i
                                className="fa fa-chevron-down"
                                style={{
                                  float: "right",
                                  position: "absolute",
                                  right: "40px"
                                }}
                                color="black"
                              ></i>
                            </div>
                            <div className="tab_left">
                              <div className="tab_left__image">
                                <img
                                  src={require("./../../css/icon/003-favorite.svg")}
                                />
                              </div>
                            </div>
                            <div className="tab_right">
                              <h4>Fitness Trainer @ Home</h4>
                              <h4>Yoga Trainer @Home</h4>
                              <h4>Online Fitness Counseling</h4>
                            </div>
                          </div>
                        </label>
                        <input
                          false=""
                          id="tab-2"
                          name="buttons"
                          type="radio"
                        ></input>
                        <label for="tab-2">
                          <div
                            className="app_inner__tab enroll-now-container"
                            style={{ alignItems: "flex-start" }}
                          >
                            <h2>
                              Genuine Customer! Book Trial Session <br />
                              @49/-
                              <span style={{ fontSize: "16px" }}>
                                (Refundable*)
                              </span>
                            </h2>
                            <i
                              className="fa fa-chevron-down"
                              style={{
                                float: "right",
                                position: "absolute",
                                right: "40px"
                              }}
                              color="black"
                            ></i>
                            <div className="tab_left">
                              <div className="tab_left__image">
                                <img
                                  src={require("./../../css/icon/001-support.svg")}
                                />
                              </div>
                            </div>
                            <div className="tab_right">
                              <p>
                                (Pay Rs. 49/- now ! And this will be refunded to
                                you while you make payment for the selected
                                service package. By paying this nominal amount
                                you are assuring us that you are a genuine and
                                valuable customer to us.)
                              </p>
                            </div>
                          </div>
                        </label>
                        <input
                          false=""
                          id="tab-3"
                          name="buttons"
                          type="radio"
                        ></input>
                        <label for="tab-3">
                          <div
                            className="app_inner__tab enroll-now-container"
                            style={{ alignItems: "flex-start" }}
                          >
                            <h2>Best Door Step Professional Service</h2>
                            <i
                              className="fa fa-chevron-down"
                              style={{
                                float: "right",
                                position: "absolute",
                                right: "40px"
                              }}
                              color="black"
                            ></i>
                            <div className="trial"></div>
                            <div className="tab_left" style={{ top: "40px" }}>
                              <div className="tab_left__image">
                                <i className="flaticon-slipers"></i>
                              </div>
                            </div>
                            <div className="tab_right">
                              <p>
                                We will send our best professional. If you like
                                the session go ahead with 12 sessions / 4weeks
                                suitable package.
                              </p>

                              <br />
                              <br />
                            </div>
                          </div>
                        </label>
                        <input
                          false=""
                          id="tab-4"
                          name="buttons"
                          type="radio"
                        ></input>
                        <label for="tab-4">
                          <div
                            className="app_inner__tab enroll-now-container"
                            style={{ alignItems: "flex-start" }}
                          >
                            <h2>Secure Payment Gateway</h2>
                            <i
                              className="fa fa-chevron-down "
                              style={{
                                float: "right",
                                position: "absolute",
                                right: "40px"
                              }}
                              color="black"
                            ></i>
                            <div className="tab_left">
                              <div className="tab_left__image">
                                <img
                                  src={require("./../../css/icon/002-rating.svg")}
                                />
                              </div>
                            </div>
                            <div className="tab_right">
                              <p>
                                Pay using our secure payment gateway, and let
                                our professionals deliver a winnig service.
                              </p>

                              <br />
                              <br></br>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <br />
              <div className="container">
                <h2 className="dietplanheading">
                  <strong>Choose the best diet plan for you !</strong>
                </h2>
              </div>
              <div className="row">
                <div
                  className="col-md-12 col-sm-12 col-lg-12 container-row dietplans"
                  style={{ alignItems: "stretch" }}
                >
                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="0"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="0"
                    >
                      <div className="padding-10" id="0">
                        Ketogenic Diet Plan
                      </div>
                      <br />
                      <div className="diet-bottom" id="0">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.1999
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.499</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="3"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="3"
                    >
                      <div className="padding-10" id="3">
                        Weight Gain/Muscle building Diet Plan
                      </div>
                      <br />
                      <div className="diet-bottom" id="3">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.999
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.299</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="4"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="4"
                    >
                      <div className="padding-10" id="4">
                        For Wedding/ Any special function(Quick weight loss
                        Plan)
                      </div>
                      <br />
                      <div className="diet-bottom" id="4">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.2499
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.599</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="5"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="5"
                    >
                      <div className="padding-10" id="5">
                        Diet plan for special medical condition
                      </div>
                      <div className="diet-bottom" id="5">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.2499
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.599</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="1"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="1"
                    >
                      <div className="padding-10" id="1">
                        Vegan Diet Plan
                      </div>
                      <div className="diet-bottom" id="1">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.799
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.199</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="2"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="2"
                    >
                      <div className="padding-10" id="2">
                        Healthy Life Style Diet Plan
                      </div>
                      <div className="diet-bottom" id="2">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.999
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.299</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="6"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="6"
                    >
                      <div className="padding-10" id="6">
                        Intermittent Fasting Diet Plan
                      </div>
                      <div className="diet-bottom" id="6">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.899
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.399</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="enroll-now-container-diet textAlign-center dietplanWidthContainer"
                    id="8"
                    onClick={e => this.dietplantypes(e)}
                  >
                    <div
                      className="container-diet margin-0 padding-0 dietplanWidth"
                      id="8"
                    >
                      <div className="padding-10" id="8">
                        Expert Counselling + Customised Diet Plan
                      </div>
                      (3 Months plan)
                      <div className="diet-bottom" id="8">
                        <span style={{ textDecoration: "line-through" }}>
                          Rs.1999
                        </span>
                        <div> - </div>
                        <span className="bold">Rs.499</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <Testimonials />
            </section>

            <section>
              <br />
              <div className="container">
                <h2 className="safehandsheading">
                  <strong>You are in safe hands.</strong>
                </h2>
              </div>
              <center>
                <img
                  src={require("../../assests/hand.png")}
                  style={{ width: "30%" }}
                />
              </center>
            </section>
            {this.state.show ? (
              <Requestform
                onHide={() => this.changeshow()}
                show={this.state.show}
              />
            ) : null}

            <Modal
              show={this.state.view}
              onHide={() => this.changeview()}
              backdrop={"static"}
              keyboard={false}
              size="sm"
              className="col-sm-12 col-md-6"
            >
              <Modal.Header closeButton className="Howitworks_Header">
                <h3>How it works</h3>
              </Modal.Header>
              <HowitWorks closehowitworks={() => this.changeview()} />
            </Modal>

            <Modal
              show={this.state.howitworks_onclick}
              onHide={() => this.hideHowitWorks_Onclick()}
              backdrop={"static"}
              keyboard={false}
            >
              <Modal.Header closeButton className="Howitworks_Header">
                <h3>How it works</h3>
              </Modal.Header>
              <HowitWorks_Onclick
                closehowitworks_Onclick={() => this.hideHowitWorks_Onclick()}
              />
            </Modal>
            <Modal
              show={this.state.showCorporate}
              onHide={() => this.changeshow()}
            >
              <Modal.Header closeButton></Modal.Header>
              <CorporatePlan onHide={() => this.changeshow()} />
            </Modal>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentuser: state.sessionState.authUser,
    User: state.userDetail,
    splashState: state.splashState.splashState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    typeOfService: services => {
      dispatch(RegisterService(services));
    },
    getdescription: description => {
      dispatch(Description(description));
    },
    splashState: timer => {
      dispatch(SplashState(timer));
    },
    storeProfile: data => {
      dispatch(userLoginDetails(data));
    },
    diet_plan: typeofdiet => {
      dispatch(type_of_diet(typeofdiet));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
