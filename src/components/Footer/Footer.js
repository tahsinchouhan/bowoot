import React from "react";
import "../../css/Footer.css";
import LazyLinePainter from "lazy-line-painter";
import CorporatePlan from "../Landing/CorporatePlan";
import { Card, Modal, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { NavLink } from "reactstrap";
import NatalForm from "../Landing/NatalForm";
class Footer extends React.Component {
  state = {
    show: false,
    view: false
  };

  componentDidMount() {
    let els = {
      logo: document.querySelector("#lion")
    };
    let myAnimation;
    myAnimation = new LazyLinePainter(els.logo, {
      strokeWidth: 2.4,
      strokeCap: "round",
      strokeColor: "#a9d372",
      ease: "easeInOutSine",
      drawSequential: true,
      repeat: -1,
      delay: 500
    });
    myAnimation.paint();
    // myAnimation.on("start", onStart);
  }
  changeshow() {
    this.setState({
      show: false
    });
  }
  changeview() {
    this.setState({
      view: false
    });
  }
  callcorporate() {
    this.setState({
      show: true
    });
  }
  callnatal() {
    this.setState({
      view: true
    });
  }
  render() {
    return (
      <section className="foot">
        <div className="container-fluid">
          <div
            className="row container-row"
            style={{ alignItems: "flex-start" }}
          >
            <div className="bowootfoot col-sm-3">
              <h4 className="foothead">
                <strong>Bowoot</strong>
              </h4>
              <ul className="itemsfoot">
                <a href="/">
                  <li style={{ color: "white" }}>About us</li>
                </a>
                <a href="/diet">
                  <li style={{ color: "white" }}>Packages</li>
                </a>
                <a href="/diet">
                  <li style={{ color: "white" }}>How it Works</li>
                </a>
                <a href="#">
                  <li style={{ color: "white" }}>Careers</li>
                </a>
                <a href="#">
                  <li style={{ color: "white" }}>Contact us</li>
                </a>
                <a href="#">
                  <li style={{ color: "white" }}>Blogs</li>
                </a>
              </ul>
            </div>

            <div className="servicesfoot col-sm-3">
              <h4 className="foothead">
                <strong>Services</strong>
              </h4>
              <ul className="itemsfoot service_mq_foot">
                <a href="/fitnessplan">
                  <li style={{ color: "white" }}>Weightloss & Toning</li>
                </a>
                <a href="/fitnessplan">
                  <li style={{ color: "white" }}>Cardio Fitness</li>
                </a>
                <a onClick={() => {
                    this.callnatal();
                  }}>
                  <li style={{ color: "white" }}>Pre/Post Natal exercise</li>
                </a>
                <a href="fitnessplan">
                  <li style={{ color: "white" }}>Weight/resistance training</li>
                </a>
                <a  onClick={() => {
                    this.callcorporate();
                  }}>
                  <li style={{ color: "white" }}>Corporate Fitness</li>
                </a>
                <a href="/booksession">
                  <li style={{ color: "white" }}>Senior Fitness</li>
                </a>
                <a href="/booksession">
                  <li style={{ color: "white" }}>Youth and Team Fitness</li>
                </a>
                <a href="/diet">
                  <li style={{ color: "white" }}>Group Training</li>
                </a>
                <a href="/booksession">
                  <li style={{ color: "white" }}>Yoga training</li>
                </a>
                <a href="/booksession">
                  <li style={{ color: "white" }}>Sports Conditioning</li>
                </a>
                <a href="/diet">
                  <li style={{ color: "white" }}>Nutrition Counselling</li>
                </a>
                <a href="/institute">
                  <li style={{ color: "white" }}>
                    Fitness/Nutritionist Certifications
                  </li>
                </a>
              </ul>
            </div>
            <div className="faqfoot col-sm-3">
              <h4 className="foothead faq col-sm-3">
                <strong>FAQ</strong>
              </h4>
              <ul className="itemsfoot faq_item_mq">
                <a href="/TermsConditions">
                  <li style={{ color: "white" }}>Terms & Conditions</li>
                </a>
                <a href="/Privacy">
                  <li style={{ color: "white" }}>Privacy Policy</li>
                </a>
              </ul>
            </div>
            <div className="corporatefoot col-sm-3">
              <h4 className="foothead">
                <strong></strong>
              </h4>
              <ul className="itemsfoot corporate_mq">
                <a
                  onClick={() => {
                    this.callcorporate();
                  }}
                >
                  <li>Corporate Plans</li>
                </a>
                <a
                  onClick={() => {
                    this.callnatal();
                  }}
                >
                  <li>Natal (Pre & Post)</li>
                </a>
              </ul>

              <h2 className="makeinindia">
                <strong style={{ color: "white" }}>Make in INDIA.</strong>
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 79.46 79.51"
                data-llp-composed="true"
                id="lion"
                className="lazy-line-painter"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <path
                    className="cls-1"
                    d="M41.32,53.55c-.91-.45-1-3-1-3s-.16,2.58-1.06,3a13.82,13.82,0,0,0-3.33,1.55l-.42.26c2.19-.32,4.84-.45,4.84-.45s2.61.09,4.79.38L44.67,55A13.5,13.5,0,0,0,41.32,53.55Z"
                    data-llp-id="lion-0"
                    data-llp-duration="1490"
                    data-llp-delay="0"
                    fill-opacity="0"
                    data-llp-stroke-join="bevel"
                    data-llp-stroke-cap="round"
                  />
                  <path
                    className="cls-1"
                    d="M47.2,32c-1.57,1-1.46,3.52-1.26,7.12s.48,5.69-.3,7.1-5.39,1-5.39,1-4.66.47-5.46-.93-.55-3.5-.4-7.1.22-6.14-1.37-7.1-3.34-.76-4.92-1.1-3.25-.86-3.25-.86A8.45,8.45,0,0,0,27.06,33a5.94,5.94,0,0,0,4.14,1.55A3.61,3.61,0,0,0,33,34a13.2,13.2,0,0,1,.38,4.91c-.24,3.07-.85,5.67.77,8.24a6,6,0,0,0,4,3,19.08,19.08,0,0,0,2.21.16,17.82,17.82,0,0,0,2.15-.19,6.08,6.08,0,0,0,3.93-3c1.58-2.6.92-5.19.64-8.25a13.17,13.17,0,0,1,.32-4.92,3.68,3.68,0,0,0,1.75.51,5.89,5.89,0,0,0,4.11-1.6,8.44,8.44,0,0,0,2.18-2.91s-1.67.53-3.24.9S48.78,31,47.2,32Z"
                    data-llp-id="lion-1"
                    data-llp-duration="1490"
                    data-llp-delay="0"
                    fill-opacity="0"
                    data-llp-stroke-join="bevel"
                    data-llp-stroke-cap="round"
                  />
                  <path
                    className="cls-2"
                    d="M76.16,17.3c-3.4-6.49-11.21-9-11.21-9a3.73,3.73,0,0,1,2-1.19,11.45,11.45,0,0,1,2.81-.58S68.29,3.74,61.52,1C59-.07,56.05-.32,52,.45S44.25,4.8,44.25,4.8a5.58,5.58,0,0,1,.58-2.13c.57-1.2,1-2.1,1-2.1a10,10,0,0,0-3.26,1.68A11,11,0,0,0,39.79,5a11.91,11.91,0,0,0-2.92-2.77A10,10,0,0,0,33.61.57s.46.9,1,2.1a5.66,5.66,0,0,1,.57,2.13S31.54,1.23,27.48.45s-7-.52-9.54.53C11.17,3.74,9.73,6.51,9.73,6.51a11.57,11.57,0,0,1,2.82.58,3.72,3.72,0,0,1,2,1.19S6.7,10.81,3.3,17.3A29.06,29.06,0,0,0,.1,33.14,51.38,51.38,0,0,0,3.7,47.65L6,45.88S6.3,53.38,8.3,57c7.79,14.12,18.75,17.86,18.75,17.86a12.41,12.41,0,0,1-.57-2.41,25.79,25.79,0,0,1-.18-4.4,16.18,16.18,0,0,0,3.64,6.11c4.22,4.2,8.21,5.14,9.85,5.35,1.64-.21,5.52-1.15,9.73-5.35a16.18,16.18,0,0,0,3.64-6.11,26.49,26.49,0,0,1-.17,4.4,12.74,12.74,0,0,1-.58,2.41s11-3.74,18.75-17.86c2-3.62,2.33-11.12,2.33-11.12l2.27,1.77a51,51,0,0,0,3.6-14.51A29.06,29.06,0,0,0,76.16,17.3ZM60.54,31.05c-.27,1-3.32,5.21-4.43,6.33s-2.37,2.12-2.36,3.52.33,7-.64,8.55-4.44,4.65-5.28,5.36a2.66,2.66,0,0,1-1,.56,2.61,2.61,0,0,1,2,2.93,5.24,5.24,0,0,1-2.07,3.52c-1.12.7-6.34.6-6.34.6s-5.28.18-6.41-.51a5.26,5.26,0,0,1-2.12-3.49,2.62,2.62,0,0,1,1.91-3,2.55,2.55,0,0,1-1-.55,37.64,37.64,0,0,1-5.36-5.28c-1-1.53-.75-7.13-.76-8.54s-1.28-2.37-2.41-3.48S20,32.32,19.67,31.34s1-3.08,2.06-4.91,6.24-8.87,6.94-9.29,3.17-.14,5.22,1.3c4.52,3.18,6.22,9,6.22,9s1.87-6.08,6.17-9c2.08-1.39,4.36-1.88,5.06-1.47s5.94,7.38,7.07,9.2S60.82,30.07,60.54,31.05Z"
                    data-llp-id="lion-2"
                    data-llp-duration="1490"
                    data-llp-delay="0"
                    fill-opacity="0"
                    data-llp-stroke-join="bevel"
                    data-llp-stroke-cap="round"
                  />
                </g>
              </svg>
            </div>

            <Modal show={this.state.show} onHide={() => this.changeshow()}>
              <Modal.Header closeButton></Modal.Header>
              <CorporatePlan onHide={() => this.changeshow()} />
            </Modal>

            <Modal
              show={this.state.view}
              onHide={() => this.changeview()}
              className="col-sm-12"
            >
              <Modal.Header closeButton></Modal.Header>
              <NatalForm onHide={() => this.changeview()} />
            </Modal>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Footer);
