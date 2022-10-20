import React from "react";
class Progress extends React.Component {
  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="progress blue">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
              <div className="progress-value">
                <strong>4126</strong>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="progress yellow">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
              <div className="progress-value">
                <strong>4126</strong>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="progress yellow">
              <span className="progress-left">
                <span className="progress-bar"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar"></span>
              </span>
              <div className="progress-value">
                <strong>4126</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Progress;
