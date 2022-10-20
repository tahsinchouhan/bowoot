import React from "react";
import { firebase } from "./../firebase";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = e => {
    let profile = this.state.profile;
    profile[e.target.name] = e.target.value;
    this.setState({
      profile: profile
    });
  };

  handleClick = e => {
    e.preventDefault();
    let self = this;
    const uid = firebase.auth().currentUser.uid;
    const getRef = firebase
      .database()
      .ref("/users")
      .child(uid)
      .child("profile")
      .set(self.state.profile);
  };
 
  componentWillMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      const getRef = firebase
        .database()
        .ref("users")
        .child(user.uid)
        .child("profile");
      if (user) {
        getRef.on(
          "value",
          snapshot => {
            let results = snapshot.val();
            self.setState({ profile: results });
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
    });
  }
  render() {
    let profile = this.state.profile;
    return (
      <div>
        <div className="edit_allign">
          <h3 className="shady_header ">Edit Your Profile</h3>
        </div>
        <div className="paddingeditcontainer">
        <div className=" modal-container editprofile">
          <form onSubmit={this.handleClick} className="login">
            <div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.profile.name}
                />
              </div>
            </div>
            <div>
              <div className="form-group">
                <div className="container-row">
                  <div className="radio">
                    <input
                      id="radio-1"
                      name="gender"
                      type="radio"
                      value="Male"
                      checked={this.state.profile.gender === "Male"}
                      onChange={this.handleInputChange}
                    />
                    <label for="radio-1" className="radio-label">
                      Male
                    </label>
                  </div>
                  <div className="radio">
                    <input
                      id="radio-2"
                      name="gender"
                      type="radio"
                      value="Female"
                      checked={this.state.profile.gender === "Female"}
                      onChange={this.handleInputChange}
                    />
                    <label for="radio-2" className="radio-label">
                      Female
                    </label>
                  </div>
                </div>
                <div style={{ color: "black", fontSize: 15 }}>
                  {this.state.genderError}
                </div>
              </div>
            </div>
            <div className="input">
              <div className="form-group">
                <input
                  type="phoneNumber"
                  placeholder="phone Number"
                  className="form-control"
                  name="phoneNumber"
                  onChange={this.handleInputChange}
                  value={this.state.profile.phoneNumber}
                />
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2"></div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-2"></div>
                </div>
                <center className="bottom">
                  <button
                    type="submit"
                    className="login_signup_button "
                    onClick={e => this.handleClick(e)}
                  >
                    Edit Profile
                  </button>
                </center>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
