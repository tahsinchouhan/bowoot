import React from "react";
class MessageNotifications extends React.Component {
  constructor(props, { match }) {
    super(props, { match });
    this.state = {
      message: "",
      name: ""
    };
  }
  handleInputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReset = () => {
    this.setState({
      message: "",
      name: ""
    });
  };

  render() {
    return <div></div>;
  }
}
export default MessageNotifications;
