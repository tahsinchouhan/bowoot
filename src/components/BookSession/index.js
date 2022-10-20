import React from "react";
import { connect } from "react-redux";
import { updateUserStep } from "../../actions/index";
import Header from "../Header";
import PickServiceDate from "./PickServiceDate";
import UserCategory from "./UserCategory";
import PickServiceTime from "./PickServiceTime";
import PickTrialTime from "./PickTrialTime";
import PickServicePackage from "./PickServicePackage";
import PickServiceDeatails from "./PickServiceDeatails";
import PickServiceSuccess from "./PickServiceSuccess";
import TypeOfService from "./TypeOfService";
import Address from "./Address";
import { ProgressBar } from "react-bootstrap";
import { capitalize } from "./../Custom/Capitalize";

class BookSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      times: []
    };
  }
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  callParentTomo = data1 => {
    this.setState({
      times: data1
    });
    console.log(this.state.times);
  };

  callParent = data => {
    this.setState({
      times: data
    });
  };
  componentDidMount() {
    if (this.props.service) {
      this.setState({
        step: 1
      });
    }
  }
  render() {
    const { step } = this.state;
    return (
      <div className="gym-background background-watermark">
        {this.props.userRenderPage === "BookSession" ? null : <Header />}
        <div className="book_index">
          <div class="container MQ_Tab_allign book_mq">
            <div class="row MQ_allign book_mq">
              <div className="col book_how_it_works">
                <div className="enroll-now-container bookhowcontainer">
                  <ul>
                    <strong>How it works</strong>
                    <li>1. Pick your service</li>
                    <li>2. Fill the simple body assessment form</li>
                    <li>3. Choose the duration plan (1/3 Months plan)</li>
                    <li>4. Make payment and sit back </li>
                    <li>
                      5. Let our experts work on your diet plan, send it to you
                      within 24 hours.
                    </li>
                  </ul>
                </div>
              </div>
              <img
                src={
                  this.props.service === "FITNESS"
                    ? require("../../assests/fitness.png")
                    : require("../../assests/fitness.png")
                }
                className="fitnessChooseImage"
              />
              {/* <div class="col" style={{ display: "flex" }}>
                <div className="box-image fitness_container">
                  <div> */}
              <div className="trainer_container box-image booksession_container col-sm-7 col-md-7 col-xl-7 col-lg-7">
                <div className="trainer_header_container">
                  {this.props.service ? (
                    <h5>{capitalize(this.props.service)} @ Home</h5>
                  ) : (
                    <h5>@ Home</h5>
                  )}
                </div>{" "}
                <ProgressBar
                  now={(this.state.step * 100) / 9}
                  className="progressStyle"
                />
                <br />
                {(() => {
                  switch (step) {
                    case 0:
                      return <TypeOfService nextStep={this.nextStep} />;
                    case 1:
                      return <PickServiceTime nextStep={this.nextStep} />;
                    case 2:
                      return (
                        <UserCategory
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                        />
                      );
                    case 3:
                      return (
                        <PickServiceDate
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                          callParent={data => this.callParent(data)}
                          callParentTomo={tomo_data =>
                            this.callParentTomo(tomo_data)
                          }
                        />
                      );
                    case 4:
                      return (
                        <PickTrialTime
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                          // timestochild={this.state.times}
                          // tomotimestochild={this.state.tomotimes}
                          time={this.state.times}
                        />
                      );
                    case 5:
                      return (
                        <PickServicePackage
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                        />
                      );
                    case 6:
                      return (
                        <Address
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                        />
                      );
                    case 7:
                      return (
                        <PickServiceDeatails
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                        />
                      );
                    case 8 || 9:
                      return (
                        <PickServiceSuccess
                          nextStep={this.nextStep}
                          prevStep={this.prevStep}
                        />
                      );
                  }
                })()}
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    userRenderPage: State.userDetail.userpage,
    service: State.serviceState.services
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStep: step => {
      dispatch(updateUserStep(step));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSession);
