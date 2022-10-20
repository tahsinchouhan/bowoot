import React from "react";

import { connect } from "react-redux";

class TrainerDashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
  }
  render() {
    return (
      <div className="container">
        welcome user {this.props.location.params.username}
      </div>
    );
  }
}

const mapStateToProps = State => {
  return {
    user: State.userDetail.user
  };
};
export default connect(mapStateToProps)(TrainerDashBoard);
