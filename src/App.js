import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createBrowserHistory } from "history";
import Home from "./components/Landing/Home";
import ShopNow from "./components/Landing/ShopNow";
import FoodZone from "./components/Landing/FoodZone";
import Institute from "./components/Landing/Institute";
import Payment from "./components/Landing/Payment";
import { connect } from "react-redux";
import Notification from "./components/Login/Notification";
import Splash from "./components/Custom/Splash";
import Privacy from "./components/Landing/Privacy";
import TermsConditions from "./components/Landing/TermsConditions";
import Login from "./components/Login/LoginSignup";
import UploadReview from "./components/Landing/UploadReview";
import AdminNavigation from "./components/Navigation/AdminNavigation";
import UserNavigation from "./components/Navigation/UserNavigation";
import UserDashBoard from "./components/Dashboard";
import UserRegistration from "../src/components/UserRegistration/UserRegistration";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import { firebase } from "./components/firebase/index";
import withAuthentication from "./components/Session/withAuthentication";
import TicketRaised from "./components/Dashboard/TicketRaised";
import { userLoginDetails } from "./actions";
import BookSession from "./components/BookSession";
import TrainerRegistrations from "./components/TrainerRegistrations";
import FitnessDietPlan from "./components/Landing/Diet/FitnessDietPlan";
import "../src/css/App.css";
import "../src/components/Header/header.css";
import Transactions from "./components/Dashboard/Transactions";
import Diet from "./components/Landing/Diet";

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase
        .database()
        .ref("users")
        .child(user.uid)
        .child("profile")
        .on("value", function(snapshot) {
          self.props.storeProfile(snapshot.val());
        });
    });
  }
  render() {
    return (
      <div className="App bg-header">
        <Router history={history}>
          <Switch>
            <Route exact path="/Privacy" component={Privacy} />
            <Route exact path="/TermsConditions" component={TermsConditions} />
            <Route exact path="/" component={Home} />
            <Route exact path="/foodzone" component={FoodZone} />
            <Route exact path="/shopnow" component={ShopNow} />
            <Route exact path="/institute" component={Institute} />
            <Route exact path="/payment" component={Payment} />
            <Route
              exact
              path="/service/yogatrainer"
              component={UserRegistration}
            />
            <Route
              exact
              path="/service/fitnesstrainer"
              component={UserRegistration}
            />
            <Route
              exact
              path="/service/dietplan"
              component={UserRegistration}
            />
            <Route exact path="/trainer" component={TrainerRegistrations} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/uploadreview" component={UploadReview} />
            <Route exact path="/error" component={Notification} />
            <Route exact path="/diet" component={Diet} />
            <Route exact path="/booksession" component={BookSession} />

            <Route exact path="/user/userDashboard" component={UserDashBoard} />
            <Route exact path="/transaction" component={Transactions} />
            <Route exact path="/ticketRaised" component={TicketRaised} />
            <Route
              exact
              path="/admin/adminDashboard"
              component={AdminDashBoard}
            />

            <Route exact path="/user" component={UserNavigation}></Route>
            <Route exact path="/admin" component={AdminNavigation} />
            <Route exact path="/fitnessplan" component={FitnessDietPlan} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    storeProfile: data => {
      dispatch(userLoginDetails(data));
    }
  };
};
export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
