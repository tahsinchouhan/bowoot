import React from "react";
import OpenTickets from "./OpenTickets";
import ClosedTickets from "./ClosedTickets";

class RaisedTicketDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "open_ticket"
    };
  }

  render() {
    const resultant = this.state.result;
    return (
      <div>
        <div className="user_service_display_container">
          <div className="tickets_header">
            <span style={{
          color: this.state.activeTab === "open_ticket" ? 'black' : 'grey'
        }}
          onClick={() => {
            this.setState({ activeTab: "open_ticket" });
          }}
        >

          Open
        </span>
        |
        <span style={{
          color: this.state.activeTab === "closed_tickets" ? 'black' : 'grey'
        }}
          onClick={() => {
            this.setState({ activeTab: "closed_tickets" });
          }}
        >
          closed
        </span></div>
        
        <hr/>
          {this.state.activeTab === "open_ticket" ? <OpenTickets /> : null}
          {this.state.activeTab === "closed_tickets" ? <ClosedTickets /> : null}
        </div>
      </div>
    );
  }
}

export default RaisedTicketDisplay;
