import React from "react";
import { firebase } from "../firebase/index";
import { connect } from "react-redux";
import { Card, Accordion } from "react-bootstrap";

class TrainerDetailsAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            show:false
        };
    }
    componentDidMount() {
        let self = this;
        firebase.auth().onAuthStateChanged(function (user) {
            const getRef = firebase
                .database()
                .ref("trainers")


            if (user) {
                getRef.on(
                    "value",
                    snapshot => {
                        let results = snapshot.val();
                        self.setState({ result: results });
                    },
                    function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    }
                );
            }
        });
    }
    
  handleClick() {
    this.setState(state => {
      return {
        show: !state.show,
      }
    })
  }
    render() {
        const resultant = this.state.result;
        return (
            <div className="container">
               <button onClick={() => this.handleClick()}>Trainers </button>
               {this.state.show ? (
                <Accordion>
                    <Card>
                        {resultant
                            ? Object.keys(resultant).map((item,index) => (
                                <div>
                                    <Accordion.Toggle as={Card.Header} eventKey={index}>

                                        {item}

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <Card.Body>
                                            {Object.keys(resultant[item]).map(i => (

                                                <div>
                                                  <strong>{i}</strong>
                                                    {Object.keys(resultant[item][i]).map(itk => (

                                                        <div>
                                                            {itk}-{resultant[item][i][itk]}

                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </div>
                            ))
                            : null}
                    </Card>
                </Accordion>
                 ) : null}
            </div>

        );
    }
}

const mapStateToProps = State => {
    return {
        user: State.userDetail.user
    };
};
export default connect(mapStateToProps)(TrainerDetailsAdmin);
