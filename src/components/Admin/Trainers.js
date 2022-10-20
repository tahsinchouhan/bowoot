import React from "react"
import { firebase } from "../firebase/index";
import TrainerProfile from "./TrainerProfile"

class Trainers extends React.Component{
    constructor(){
        super()
        this.state = {
          result:[],
          open:true,
          tid:'',
          tname:''
        }
    }
    
      componentDidMount(){
          firebase.database().ref("trainers").on("value",
          snapshot => {
            let results = snapshot.val()
            this.setState({result:results});
          }) 
      }

      handleClick = (e) =>{
        this.setState({
          open:false,
          tid:e.target.id
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
              <span className="dashboard-logo">TRAINER</span>
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
                                    <a href={resultant[item].profile?resultant[item].profile.photoURL:null} target="_blank">
                                      <img
                                      style={{width:"70px",height:"70px",borderRadius:"10px"}}
                                      src={resultant[item].profile?resultant[item].profile.photoURL:null}
                                      alt="trainer image"
                                      />
                                    </a>
                                </div>

                              <div className="col-sm-12 wid">
                                

                                <div className="row">
                             
                                  <span style={{textTransform:"capitalize"}} className="pd">
                                    {resultant[item].profile?resultant[item].profile.name:null}

                                  </span>
                            
                                  <span className="pd">
                                   {resultant[item].profile?resultant[item].profile.age:null}
                                  </span>
                            
                                  <span className="pd">
                                    {resultant[item].profile?resultant[item].profile.email:null}
                                  </span>

                                  <span className="pd">
                                    {resultant[item].profile?resultant[item].profile.phone:null}
                                  </span>

                                  <span className="pd">
                                    {resultant[item].profile?resultant[item].profile.pin:null}
                                  </span>

                                </div>

                                <div className="row" style={{fontWeight:"600"}}>
                                  <span className="pd">Leads Till Now: 24</span>
                                  <span className="pd">Leads Served: 24</span>
                                </div>

                            </div>

                            <div className="right-side col-sm-4">
                             
                              <div>
                              <span className="text-primary" onClick={this.handleClick}><u id={item}>View Profile</u></span>
                              </div>
                              
                              <div >
                                <div style={{backgroundColor:"orange",padding:"3px 1px 3px 1px",width:"100px",borderRadius:"15px",fontWeight:"bold",textAlign:"center",color:"white"}}>
                                  {resultant[item].profile?resultant[item].profile.experience:null}
                                </div>
                              </div>

                              <div >
                                <span style={{color:"#14900f"}}>
                                  4.5 <i className="fa fa-star star"></i>
                                </span>
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
                    : <div><i class="fa fa-arrow-left dashboard-logo" onClick={this.handleBack} style={{display:"inline",paddingRight:"30px",fontSize:"20px"}}></i><TrainerProfile tid={this.state.tid}/></div>
                    }
            </div>
        )
    }
}

export default Trainers