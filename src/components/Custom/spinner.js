import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";

export default class CustomSpinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="spinner-container">
        <center className="spinner">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
        </center>
      </div>
    );
  }
}
