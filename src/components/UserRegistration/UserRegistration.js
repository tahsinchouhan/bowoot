import React from "react";
import LoginSignup from "../Login/LoginSignup";

const stylesApp = {
  marginTop: 40
};

class UserRegistration extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <LoginSignup onSubmit={this.props.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistration;
