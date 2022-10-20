import React from "react";
import { connect } from "react-redux";
import { createDocument } from "../../actions";
import { ToastContainer, toast, Flip } from "react-toastify";
import { firebase } from "./../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../Custom/ToastConfig";

const FA = require("react-fontawesome");

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aadhar: props.trainer.documents.aadhar,
      pan: props.trainer.documents.pan,
      photo: props.trainer.documents.photo,
      certificate: props.trainer.documents.certificate
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({ [e.target.name]: [e.target.files[0]] });
    }
  };
  handleUpload = e => {
    e.preventDefault();
    if (
      this.state.aadhar !== undefined &&
      this.state.pan !== undefined &&
      this.state.photo !== undefined &&
      this.state.certificate !== undefined
    ) {
      this.props.onAddPost(this.state);
      this.props.onSubmit();
    } else {
      toast("Please provide images of all the documents !!", toastConfig);
    }
  };

  handleReset = () => {
    this.setState({
      aadhar: "",
      pan: "",
      photo: "",
      certificate: ""
    });
  };
  validate = () => {
    let aadharError = "";
    let panError = "";
    let photoError = "";
    let certificateError = "";

    if (!this.state.aadhar) {
      aadharError = toast("Upload Aadhar", toastConfig);
    }
    if (!this.state.pan) {
      panError = toast("Upload PAN", toastConfig);
    }
    if (!this.state.photo) {
      photoError = toast("Upload Photo", toastConfig);
    }
    if (!this.state.certificate) {
      certificateError = toast("Upload Certificates", toastConfig);
    }
    if (aadharError || panError || photoError || certificateError) {
      this.setState({ aadharError, panError, photoError, certificateError });
      return false;
    }
    return true;
  };
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <form onSubmit={this.handleUpload}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-2" style={{ color: "grey" }}>
                      Aadhar:
                    </div>
                    <div
                      className="col-sm-6 file-input"
                      style={{ display: "flex" }}
                    >
                      <input
                        id="file"
                        type="file"
                        name="aadhar"
                        className="custom-file-input"
                        onChange={this.handleChange}
                      />
                      <label for="file" className="btn-2">
                        Choose a file
                      </label>
                    </div>
                    {this.state.aadhar ? this.state.aadhar[0].name : null}
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-2" style={{ color: "grey" }}>
                      Pan:
                    </div>
                    <div
                      className="col-sm-6 file-input"
                      style={{ display: "flex" }}
                    >
                      <input
                        type="file"
                        id="pan"
                        name="pan"
                        className="custom-file-input"
                        onChange={this.handleChange}
                      />
                      <label for="pan" className="btn-2" id="pan">
                        Choose a file
                      </label>
                    </div>
                    {this.state.pan ? this.state.pan[0].name : null}
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-2" style={{ color: "grey" }}>
                      Photo:
                    </div>
                    <div
                      className="col-sm-6 file-input"
                      style={{ display: "flex" }}
                    >
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        className="custom-file-input"
                        onChange={this.handleChange}
                      />
                      <label for="photo" className="btn-2" id="photo">
                        Choose a file
                      </label>
                    </div>
                    {this.state.photo ? this.state.photo[0].name : null}
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-2" style={{ color: "grey" }}>
                      Certificate:
                    </div>

                    <div
                      className="col-sm-6 file-input"
                      style={{ display: "flex" }}
                    >
                      <input
                        type="file"
                        id="certificate"
                        name="certificate"
                        className="custom-file-input"
                        onChange={this.handleChange}
                      />
                      <label for="certificate" className="btn-2" id="certificate">
                        Choose a file
                      </label>
                    </div>
                    {this.state.certificate
                      ? this.state.certificate[0].name
                      : null}
                  </div>
                </div>
                <div className="iconContainerRow">
                  <FA
                    name="arrow-left"
                    onClick={() => this.props.previousPage()}
                    className="iconPrev"
                  />
                  <FA
                    name="arrow-right"
                    onClick={e => this.handleUpload(e)}
                    className="iconNext"
                  />
                </div>
              </form>
            </div>
            <ToastContainer transition={Flip} />
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: documents => {
      dispatch(createDocument(documents));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Step3);
