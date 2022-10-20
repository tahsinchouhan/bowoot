import React from "react";

import { withRouter } from "react-router-dom";
import firebase from "../../firebase";
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      phone: "",
      email: "",
      result: ""
    };
  }
  handleSubmit = () => {
    console.log(
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
      })
    );
  };

  render() {
    const resultant = this.state.result;
    return (
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => this.handleSubmit(e)}
        >
          Profile Details
        </button>
        <div>
          {resultant
            ? Object.keys(resultant).map(item => (
                <div>
                  {item}:{resultant[item]}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default withRouter(Details);
