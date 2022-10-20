import React from "react";
import { firebase } from "./../firebase";
import Slider from "react-slick";
import { Card, Image } from "react-bootstrap";
import "../../css/testimonials.css";

class Testimonials extends React.Component {
  state = {
    img: "",
    result: {}
  };
  componentDidMount() {
    let ref = firebase.database().ref("userReviews");
    ref.on(
      "value",
      snapshot => {
        let results = snapshot.val();
        this.setState({ result: results });
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  render() {
    let resultant = this.state.result;
    var settings = {
      dots: true,
      speed: 1000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      margin: "10px",
      autoplaySpeed: 6000
    };
    return (
      <div>
        <div className="dashboard-container">
          <div className="container">
            <div className="container-row testimonials">
              <div className="col-sm-6">
                <div className="readSuccessStoriesHeading">
                  Our customers love what we do
                </div>
                <div className="ReadReviewparagragh">
                  Over 500.000 companies of all sizes use Staroline to <br />
                  understand their business and their market better.
                </div>
                <div>
                  <button className="testBtn">Read The Success Stories</button>
                </div>
              </div>

              <div className=" col-sm-6">
                <Slider {...settings}>
                  {resultant
                    ? Object.keys(resultant).map((item, i) => (
                        <div key={i}>
                          <div className="input-label">
                            <Card col-12 className="testCard">
                              <Card.Body>
                                <div className="testCardContent">
                                  <div className="quotationMark">
                                    <span>&#10077;</span>
                                  </div>
                                  <Image
                                    src={resultant[item].imgurl}
                                    className="testCardImg"
                                    thumbnail
                                  />
                                </div>

                                <Card.Text className="testCardText">
                                  {resultant[item].review}
                                </Card.Text>
                                <Card.Text className="testCardName">
                                  <strong>{resultant[item].name}</strong>
                                </Card.Text>
                                <Card.Text className="testCardOccupation">
                                  {resultant[item].occupation}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      ))
                    : null}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonials;
