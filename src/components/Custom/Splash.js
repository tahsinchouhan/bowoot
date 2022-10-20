import React, { Component } from "react";
import "./../../css/Splash.css";

class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <div className="text-with-animation">BOWOOT</div>
        <div className="subtext-with-animation">
          <div>Certified fitness expert, at unbelievable price,</div>
          <br />
          <div> on your fingure tip</div>
        </div>
      </div>
    );
  }
}

export default Splash;
