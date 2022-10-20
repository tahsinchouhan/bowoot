import React, { Component } from "react";
import { connect } from "react-redux";
import { createReview } from "../../actions/index";
import { firebase } from "../firebase";

class UploadReview extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      img: "",
      imgurl: "",
      occupation: "",
      review: ""
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChangeImage = e => {
    if (e.target.files) {
      const img = e.target.files[0];
      this.setState(() => ({ img }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let self = this;
    const { img } = this.state;
    var storage = firebase.storage();
    const uploadTask = storage.ref(`userReviews/` + img.name).put(img);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("userReviews")
          .child(img.name)
          .getDownloadURL()
          .then(url => {
            self.setState({ imgurl: url });
            if (
              self.state.name.trim() &&
              self.state.img &&
              self.state.occupation.trim() &&
              self.state.review.trim()
            ) {
              var add = self.state;
              self.props.createUserReview(add);
              self.handleReset();
            }
            const database = firebase.db.ref("/userReviews");
            database.push(add);
            self.props.createUserReview(self.state);
          });
      }
    );
  };
  handleReset = () => {
    this.setState({
      name: "",
      img: "",
      occupation: "",
      review: ""
    });
  };
  render() {
    return (
      <div>
        <div className="gym-background background-watermark">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group ">
              <div className="inputfield">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="inputfield">
                <input
                  type="file"
                  name="img"
                  onChange={e => this.handleChangeImage(e)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="inputfield">
                <input
                  type="text"
                  placeholder="Occupation"
                  className="form-control"
                  name="occupation"
                  onChange={this.handleInputChange}
                  value={this.state.occupation}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="inputfield">
                <textarea
                  placeholder="Review"
                  className="form-control"
                  name="review"
                  onChange={this.handleInputChange}
                  value={this.state.review}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="inputfield">
                <button type="submit" className="buttonsubmit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { review: State.userDetail };
};
const mapDispatchToProps = dispatch => {
  return {
    createUserReview: review => dispatch(createReview(review))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UploadReview);
