import React from "react";
class HowitWorks_Onclick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "14px",
            lineHeight: "1.5rem"
          }}
        >
          <li style={{ textAlign: "left" }}>
            <strong>1.</strong> Genuine Customer! Book Trial Session @49/-
            (Refundable*)
          </li>
          <li style={{ textAlign: "left" }}>
            <strong>2.</strong> Pay Rs. 49/- now ! And this will be refunded to
            you while you make payment for the selected service package. By
            paying this nominal amount you are assuring us that you are a
            genuine and valuable customer to us.
          </li>
          <li style={{ textAlign: "left" }}>
            <strong>3.</strong> Choose the service
          </li>
          <li style={{ textAlign: "left" }}>
            <strong>4.</strong> Make payment and sit back{" "}
          </li>

          <li style={{ textAlign: "left" }}>
            <strong>5.</strong> We will send our best professional. If you like
            the session go ahead with 12 sessions / 4weeks suitable package.
          </li>
        </ul>
        <div>
          <button
            className="howitcomponent_button"
            onClick={() => this.props.closehowitworks_Onclick()}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}

export default HowitWorks_Onclick;
