import React from "react";
import firebase from "firebase";

class RaisedTicketDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }
  componentDidMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const getRef = firebase
          .database()
          .ref("userServices")
          .child(user.uid);
        getRef.on(
          "value",
          snapshot => {
            console.log("hiudhusdh", snapshot.val());
            let results = snapshot.val();
            self.setState({ result: results });
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
    });
  }
  render() {
    const resultant = this.state.result;
    return (
      <div>
        {resultant
          ? Object.keys(resultant).map(item => {
              return (
                <div>
                  {resultant[item].raisedTicket ? (
                    <div>
                      {resultant[item].typeOfservice
                        ? resultant[item].typeOfservice
                        : null}
                      {resultant[item].trial_date
                        ? new Date(resultant[item].trial_date).toDateString()
                        : null}
                      {resultant[item].trial_time
                        ? resultant[item].trial_time
                        : null}
                    </div>
                  ) : null}
                  {resultant[item].raisedTicket
                    ? Object.keys(resultant[item].raisedTicket).map(i => {
                        return (
                          <div>
                            {resultant[item].raisedTicket[i].ticket_id
                              ? resultant[item].raisedTicket[i].ticket_id
                              : null}
                            <div>
                              {resultant[item].raisedTicket[i]
                                .ticket_raise_message
                                ? resultant[item].raisedTicket[i]
                                    .ticket_raise_message
                                : null}
                            </div>
                            <div>
                              {resultant[item].raisedTicket[i]
                                .status
                                ? resultant[item].raisedTicket[i]
                                    .status
                                : null}
                            </div>
                            <a
                              href={
                                resultant[item].raisedTicket[i]
                                  .ticket_raise_file_url
                                  ? resultant[item].raisedTicket[i]
                                      .ticket_raise_file_url
                                  : null
                              }
                              target="_blank"
                            >
                              <img
                                src={
                                  resultant[item].raisedTicket[i]
                                    .ticket_raise_file_url
                                    ? resultant[item].raisedTicket[i]
                                        .ticket_raise_file_url
                                    : null
                                }
                                alt="file"
                                width="100"
                                height="100"
                              />
                            </a>

                            <div>
                              {resultant[item].raisedTicket[i].status
                                ? resultant[item].raisedTicket[i].status
                                : null}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default RaisedTicketDisplay;
