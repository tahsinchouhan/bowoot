import React from "react"
import { firebase } from "../firebase/index"

class TrainerProfile extends React.Component{

    constructor(){
        super()
        this.state = {
          result:[],
          result2:[]
        }
      }

    componentDidMount(){
        firebase.database().ref("users").child(this.props.uid).on("value",
        snapshot => {
          let results = snapshot.val()
          this.setState({result:results});
        }) 
      
        firebase.database().ref("userServices").child(this.props.uid).on("value",
            snapshot => {
                let results2 = snapshot.val()
                this.setState({result2:results2});
            }
        )

        firebase.database().ref("trainers").on("value",
          snapshot => {

          }
        )
    }

    handleUnblock = () =>{
        firebase.database().ref("users").child(this.props.uid).update({isBlocked:false}) 
    }

    handleBlock = () =>{
        firebase.database().ref("users").child(this.props.uid).update({isBlocked:true}) 
    }

    render(){
        return(
            <div>
                <span className="dashboard-logo" style={{marginLeft:"40px",position:"absolute", marginTop:"-30px"}}>Profile - <span style={{textTransform:"capitalize"}}>{this.state.result.profile?this.state.result.profile.name:null}</span></span>
                <div className="padding-top">
                    <div className="view-conn">

                        <div className="right-side">
                            <div>
                                <div className="row">
                                    <div classname="col">
                                        <img
                                        style={{width:"70px",height:"70px",borderRadius:"10px"}}
                                        src={require("./../../assests/lion.png")}
                                        alt="user image"
                                        />
                                    </div>
                                    <div>
                                        <span className="pd" style={{textTransform:"capitalize"}}>{this.state.result.profile?this.state.result.profile.name:null}</span><br/>
                                        <span className="pd">{this.state.result.profile?this.state.result.profile.phoneNumber:null}</span><br/>
                                        <span className="pd">{this.props.uid}</span>
                                    </div>
                                </div>    
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        {this.state.result.isBlocked?
                                        <button className="btn btn-warning btn-class" onClick={this.handleUnblock}><b>Unblock</b></button>
                                        :
                                        <button className="btn btn-warning btn-class" onClick={this.handleBlock}><b>Block</b></button>
                                        }                                   
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row right-side" style={{paddingTop:"60px"}}>
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>ADDRESS</span><br/>
                            </div>
                           
                        </div>

                        <div style={{paddingTop:"30px"}}>
                            <table className="table-service">
                                <tr style={{fontWeight:"100"}}>
                                    <th className="table-padding">Date</th>
                                    <th className="table-padding">Time</th>
                                    <th className="table-padding">Service Type</th>
                                    <th className="table-padding">Serviced Area</th>
                                    <th className="table-padding">Trainer Assigned</th>
                                    <th className="right-data table-padding">Amount</th>
                                </tr>
                                {this.state.result2 ?
                                Object.keys(this.state.result2).map((st, j) => (
                                <tbody key={j}>
                                <tr className="service-row">
                                    <td className="table-padding">{this.state.result2[st].trial_date?this.state.result2[st].trial_date:"-"}</td>
                                    <td className="table-padding">{this.state.result2[st].trial_time?this.state.result2[st].trial_time:"-"}</td>
                                    <td className="table-padding">{this.state.result2[st].typeOfservice || this.state.result2[st].plan || "-"}</td>
                                    <td className="table-padding">{this.state.result2[st].area? this.state.result2[st].area : "-"}</td>
                                    <td className="table-padding">{this.state.result2[st].TrainerName? this.state.result2[st].TrainerName : "-" }</td>
                                    <td className="right-data table-padding">{this.state.result2[st].amount || this.state.result2[st].bookamount}</td>
                                </tr>
                                </tbody>
                                ))
                                :null}
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default TrainerProfile