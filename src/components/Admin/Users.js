import React from "react"
import { firebase } from "../firebase/index";
import UserProfile from "./UserProfile"

class Trainers extends React.Component{
    constructor(){
        super()
        this.state = {
          result:[],
          open:true,
          uid:''
        }
    }
    
      componentDidMount(){
          firebase.database().ref("users").on("value",
          snapshot => {
            let results = snapshot.val()
            this.setState({result:results});
          }) 
      }

      handleClick = (e) =>{
        this.setState({
          open:false,
          uid:e.target.id
        });
      }

      handleBack = () =>{
        this.setState({
            open:true
        })
      }

    render(){
        const resultant = this.state.result;
        return(
            <div className="col render">
              {this.state.open?
              <div>
              <span className="dashboard-logo">USERS</span>
              <div className="padding-top">
                  <div class="view-con">
                  {resultant
                    ? Object.keys(resultant).map((item, i) => (
                      <div key={i}>
                        {resultant[item].profile?
                        <div className="enroll-now-container border_design view-container">
                          <div style={{ width: "100%" }} className="row">
                            <div className="container-service">

                                <div className="col-sm">
                                      <img
                                      style={{width:"70px",height:"70px",borderRadius:"10px"}}
                                      src={require("./../../assests/lion.png")}
                                      alt="user image"
                                      />
                                </div>

                              <div className="col-sm-12 wid1">
                                

                                <div className="row">
                             
                                  <span style={{textTransform:"capitalize"}} className="pd">
                                    {resultant[item].profile?resultant[item].profile.name:null}

                                  </span>
                            
                                  <span className="pd">
                                   {resultant[item].profile?resultant[item].profile.gender:null}
                                  </span>
                            
                                  <span className="pd">
                                    {resultant[item].profile?resultant[item].profile.email:null}
                                  </span>

                                  <span className="pd">
                                    {resultant[item].profile?resultant[item].profile.phoneNumber:null}
                                  </span>

                                </div>

                            </div>

                            <div className="right-side col-sm-4">
                             
                              <div>
                              <span className="text-primary" onClick={this.handleClick}><u id={item}>View Profile</u></span>
                              </div>

                              </div>
                            </div>
                            </div>
                        </div>
                        :null
                      }
                      </div>
                      ))
                    : null}
                    </div>
                    </div>
                    </div>
                    : <div><i class="fa fa-arrow-left dashboard-logo" onClick={this.handleBack} style={{display:"inline",paddingRight:"30px",fontSize:"20px"}}></i><UserProfile uid={this.state.uid}/></div>
                    }
            </div>
        )
    }
}

export default Trainers