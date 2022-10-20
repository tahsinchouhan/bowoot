import React, { Component } from "react";

class Price extends Component {
  render() {
    return (
      <div>
        <div className="a4">
          <img src={process.env.PUBLIC_URL + "/img5.png"} alt="img2" />
        </div>

        <div className="a5">
          <h2>Choose the princing plan</h2>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="a12">
                <p className="a13">Standard</p>
                <p className="a14">
                  <strong>$25</strong>
                </p>
                <p className="a15">Monthly Membership</p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  1 month unlimited package
                </p>
                <p className="a16">
                  {" "}
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Autoplay per month
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Short-term commitment
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Online yoga for <strong>$5/month</strong>
                </p>
                <br />
                <button className="a18">
                  <strong>Book a Class Now</strong>
                </button>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="a12">
                <p className="a13">Premium</p>
                <p className="a14">
                  <strong>$90</strong>
                </p>
                <p className="a15">Monthly Membership</p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  1 month unlimited package
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Autoplay per month
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Short-term commitment
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Online yoga for <strong>$5/month</strong>
                </p>
                <br />
                <button className="a18">
                  <strong>Book a Class Now</strong>
                </button>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="a12">
                <p className="a13">Platinum</p>
                <p className="a14">
                  <strong>$225</strong>
                </p>
                <p className="a15">Monthly Membership</p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  1 month unlimited package
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Autoplay per month
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Short-term commitment
                </p>
                <p className="a16">
                  <i
                    className="fa fa-spinner"
                    aria-hidden="true"
                    style={{ color: "teal" }}
                  ></i>{" "}
                  Online yoga for <strong>$5/month</strong>
                </p>
                <br />
                <button className="a18">
                  <strong>Book a Class Now</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Price;
