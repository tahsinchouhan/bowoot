import React, { Component } from "react";
class MapView extends Component {
  constructor(props) {
    super(props);
  }

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            position.coords.latitude +
            "," +
            position.coords.longitude +
            "&key=" +
            "AIzaSyBcTPvgOcuLoUrFvMJvFTFqMzxhJC5mSNM"
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log(
              "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
            );
          });
      });
    } else {
      console.log("error");
    }
  };

  componentDidMount() {
    this.showCurrentLocation();
  }

  render() {
    return <div></div>;
  }
}
export default MapView;
