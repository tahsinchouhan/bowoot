import React from "react"
import firebase from "firebase"

class TicketRaised extends React.Component{

    constructor(){
        super()
        this.state={
            result:[]
        }
    }

    componentDidMount(){
        firebase.database().ref("userServices").on("value",
        snapshot => {
            let results=snapshot.val()
            this.setState({
                result:results
            })
        })
    }

    render(){
        let resultant=this.state.result
        let table=[]
        { Object.keys(resultant).map((item, i) => {
            Object.keys(resultant[item]).map((tran , j) =>{
                resultant[item][tran].raisedTicket? Object.keys(resultant[item][tran].raisedTicket).map((ticket , k) =>{
                    table.push(<tr className="service-row" key={k}>
                        <td className="table-padding"><a href={resultant[item][tran].raisedTicket[ticket].ticket_raise_file_url} target="_blank"><img src={resultant[item][tran].raisedTicket[ticket].ticket_raise_file_url} alt="ticket" style={{width:"50px",height:"50px"}}/></a></td>
                        <td className="table-padding">{resultant[item][tran].raisedTicket[ticket].ticket_id}</td>
                        <td className="table-padding">{resultant[item][tran].raisedTicket[ticket].ticket_raise_message}</td>
                        <td className="table-padding right-data">{resultant[item][tran].raisedTicket[ticket].status}</td>
                    </tr> )   
                }) : console.log("no")
            })
        })}
        return(
            <div className="col render">
                <span className="dashboard-logo">TICKET RAISED</span>
                <div className="padding-top">
                    <div className="view-con">
                    <div>
                            <table className="table-service">
                                <tr style={{fontWeight:"100"}}>
                                    <th className="table-padding">Ticket Photo</th>
                                    <th className="table-padding">Ticket Id</th>
                                    <th className="table-padding">Message</th>
                                    <th className="right-data table-padding" style={{color:"green"}}>Status</th>
                                </tr>
                                <tbody>
                                    {table}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default TicketRaised