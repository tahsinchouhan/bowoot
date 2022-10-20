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
        firebase.database().ref("trainers").child(this.props.tid).on("value",
        snapshot => {
          let results = snapshot.val()
          this.setState({result:results});
        }) 
      
        firebase.database().ref("userServices").on("value",
            snapshot => {
                let results2 = snapshot.val()
                this.setState({result2:results2});
            }
        )
    }

    handleUnblock = () =>{
        firebase.database().ref("trainers").child(this.props.tid).update({isBlocked:false}) 
    }

    handleBlock = () =>{
        firebase.database().ref("trainers").child(this.props.tid).update({isBlocked:true}) 
    }

    handleApprove = () =>{
        firebase.database().ref("trainers").child(this.props.tid).update({isApproved:true})
    }

    render(){
        let resultant=this.state.result2
        let table=[]
        { Object.keys(resultant).map((item, i) => {
            Object.keys(resultant[item]).map((tran , j) =>{
                resultant[item][tran].trainerId === this.props.tid?  
                table.push(<tr className="service-row" key={j}>
                <td className="table-padding">{resultant[item][tran].trial_date?resultant[item][tran].trial_date:"-"}</td>
                <td className="table-padding">{resultant[item][tran].trial_time?resultant[item][tran].trial_time:"-"}</td>
                <td className="table-padding">{resultant[item][tran].typeOfservice?resultant[item][tran].typeOfservice:"-"}</td>
                <td className="table-padding">{resultant[item][tran].area?resultant[item][tran].area:"-"}</td>
                <td className="table-padding right-data">20</td>
                </tr> )
            : console.log("no")
            })
        })}
        return(
            <div>
                <span className="dashboard-logo" style={{marginLeft:"40px",position:"absolute", marginTop:"-30px"}}>Profile - <span style={{textTransform:"capitalize"}}>{this.state.result.profile?this.state.result.profile.name:null}</span></span>
                <div className="padding-top">
                    <div className="view-conn">

                        <div className="right-side">
                            <div>
                                <div className="row">
                                    <div classname="col">
                                    <a href={this.state.result.profile?this.state.result.profile.photoURL:null} target="_blank">
                                        <img
                                        style={{width:"70px",height:"70px",borderRadius:"10px"}}
                                        src={this.state.result.profile?this.state.result.profile.photoURL:null}
                                        alt="trainer image"
                                        />
                                    </a>
                                    </div>

                                    <div>
                                        <span className="pd" style={{textTransform:"capitalize"}}>{this.state.result.profile?this.state.result.profile.name:"-"}</span><br/>
                                        <span className="pd">{this.state.result.profile?this.state.result.profile.phone:"-"}</span><br/>
                                        <span className="pd">{this.props.tid?this.props.tid:"-"}</span>
                                    </div>

                                    
                                    
                                </div>    
                            </div>
                                    <div>
                                    <div classname="col pad-lef">
                                        <a href={this.state.result.profile?this.state.result.profile.aadharURL:null} target="_blank">
                                        <img
                                        style={{width:"70px",height:"70px"}}
                                        src={this.state.result.profile?this.state.result.profile.aadharURL:null}
                                        alt="aadhar image"
                                        />
                                        </a>
                                    </div>
                                    </div>

                                    <div>
                                    <div classname="col pad-lef">
                                        <a href={this.state.result.profile?this.state.result.profile.panURL:null} target="_blank">
                                        <img
                                        style={{width:"70px",height:"70px"}}
                                        src={this.state.result.profile?this.state.result.profile.panURL:null}
                                        alt="PAN image"
                                        />
                                        </a>
                                    </div>
                                    </div>

                                    <div>
                                    <div classname="col pad-lef">
                                        <a href={this.state.result.profile?this.state.result.profile.certificateURL:null} target="_blank">
                                        <img
                                        style={{width:"70px",height:"70px"}}
                                        src={this.state.result.profile?this.state.result.profile.certificateURL:null}
                                        alt="Certificate image"
                                        />
                                        </a>
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
                                    <div className="col">
                                        {this.state.result.isApproved?
                                            null
                                            :
                                            <button className="btn btn-warning btn-class" onClick={this.handleApprove}><b>Approve</b></button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row right-side" style={{paddingTop:"60px"}}>
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>ADDRESS</span><br/>
                                {this.state.result.profile?this.state.result.profile.c_address:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.district:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.localState:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.pin:"-"}
                            </div>
                           
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>BANK ACCOUNT DETAILS</span><br/>
                                {this.state.result.profile?this.state.result.profile.account_no:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.ifsc_code:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.branch_name:"-"}<br/>
                                {this.state.result.profile?this.state.result.profile.bank_name:"-"}
                            </div>

                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>SERVICING AREA</span><br/>
                                {this.state.result.profile?
                                <span>
                                    {Object.keys(this.state.result.profile.servicingArea).map((da, m)=>(
                                        <span>{this.state.result.profile.servicingArea[m]}<br/></span>
                                    ))}
                                </span>
                                :null}<br/>
                            </div>
                            
                            <div className="col-sm-2 tdata" style={{textAlign:"center"}}>
                                <span style={{fontWeight:"600"}}>Credit Available</span><br/>
                                <span style={{fontWeight:"bold",fontSize:"25px"}}>1234</span><br/>
                                <button className="btn btn-warning btn-class"><b>Add Credit</b></button>
                            </div>
                        </div>

                        <div style={{paddingTop:"30px"}}>
                            <table className="table-service">
                                <tr style={{fontWeight:"100"}}>
                                    <th className="table-padding">Date</th>
                                    <th className="table-padding">Time</th>
                                    <th className="table-padding">Service Type</th>
                                    <th className="table-padding">Serviced Area</th>
                                    <th className="right-data table-padding" style={{color:"green"}}>Credit spend</th>
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

export default TrainerProfile