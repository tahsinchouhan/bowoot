import React from "react"
import { firebase } from "../firebase/index";
import { Card, Accordion } from "react-bootstrap"

class Home extends React.Component{

  constructor(){
    super()
    this.state = {
      userCount:0,
      result:[]
    }
  }

  componentDidMount(){
      firebase.database().ref("users").on("value",
      snapshot => {
        let count = snapshot.numChildren()
        this.setState({userCount:count});
      })

      firebase.database().ref("userServices").on("value",
      snapshot => {
        let results = snapshot.val()
        this.setState({result:results});
      })
      
  }

    render(){
      const resultant = this.state.result;
        return(
            <div className="col  render">
            <span className="dashboard-logo">DASHBOARD</span>
            <div className="row counts">
              <div className="col-sm-2 trainer-count">
                  Total Earning
                  <i className="fa fa-inr" style={{fontSize:"18px",color:"black",marginLeft:"15px", marginTop:"-10px"}}><b>&nbsp;&nbsp;243432</b></i>
              </div>
              
              <div className="col-sm-3 trainer-count">
                  Total Trainer Earning
                  <i className="fa fa-inr" style={{fontSize:"18px",color:"black",marginLeft:"15px",marginTop:"-10px"}}><b>&nbsp;&nbsp;243432</b></i>
              </div>
              
              <div className="col-sm-3 trainer-count">
                  Total Requests till Date<br/>
                  <b style={{color:"black"}}>25</b>
              </div>
              
              <div className="col-md-3 trainer-count">
                  Leads Rejected <br/>
                  <b style={{color:"black"}}>25</b>
              </div>
            </div>

            <div className="row row2">
              <div className="col-sm-3 trainer-count">
                  Request Cancelled<br/>
                  <b style={{color:"black"}}>23</b>
              </div>
              
              <div className="col-sm-3 trainer-count">
                  Ticket Raised<br/>
                  <b style={{color:"black"}}>23</b>
              </div>
              
              <div className="col-sm-2 trainer-count">
                  Total Users<br/>
                  <b style={{color:"black"}}>{this.state.userCount}</b>
              </div>
             
              <div className="col-md-3 trainer-count">
                  Total Successful Leads <br/>
                  <b style={{color:"black"}}>23</b>
              </div>
            </div>


            <span className="dashboard-logo">Service Requested</span>
            <Accordion defaultActiveKey="0">
                  {resultant
                    ? Object.keys(resultant).map((item, i) => (
                      <div key={i}>
                         {resultant[item]? 
                                Object.keys(resultant[item]).map((data, j) => (
                        <div
                          key={j}
                          className="enroll-now-container border_design request"
                        >
                          <div style={{ width: "100%" }} className="row">
                            <Accordion.Toggle
                              as={Card.Header}
                              eventKey={j}
                              className="cardheader"
                            >
                              <div className="container-service col-sm-12">

                              {resultant[item][data].typeOfservice === 'FITNESS' ? (
                                <div className="col-sm">
                                <img
                                style={{width:"30px",height:"30px"}}
                                src={require('./../../assests/asset1.png')}
                                />
                                </div>
                                ) :null}

                                {resultant[item][data].typeOfservice === 'YOGA' ?  (
                                <div className="col-sm">
                                <img
                                style={{width:"30px",height:"30px"}}
                                src={require('./../../assests/yoga.png')}
                                />
                                </div>
                                )
                                :null
                              }

                    {resultant[item][data].plan === "KETOGENIC DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/keto.png")}
                        style={{width:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan === "VEGAN DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/vegan.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "HEALTY LIFE STYLE DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/healthy.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "MUSCLE BUILDING OR WEIGHT GAIN DEIT PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/gain_weight.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "FOR WEDDING OR ANY SPECIAL FUNCTION" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/wedding.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "DIET PLAN FOR SPECIAL MEDICAL CONDITIONS" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/medical.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "INTERMITTENT FASTING DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("../../assests/diet/fasting.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "NUTRITIONAL ASSESSMENT + DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/nutritient.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan ===
                    "EXPERT COUNSELLING + CUSTOMIZED DIET PLAN" ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/diet/custom.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}
                    
                    {resultant[item][data].plan === "MUSCLE BUILDING    " ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/woman.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                    {resultant[item][data].plan === "WEIGHT LOSS   " ? (
                      <div className="col-sm">
                      <img
                        src={require("./../../assests/muscle.png")}
                        style={{width:"30px",height:"30px"}}
                      />
                      </div>
                    ) : null}

                             <div className="col-sm-1">
                              <span className="space">
                                  {resultant[item][data].typeOfservice?resultant[item][data].typeOfservice:null}
                                  {resultant[item][data].plan?resultant[item][data].plan:null}
                              </span>
                              </div>

                              <div className="col-sm-2">
                                {resultant[item][data].trial_date?new Date(resultant[item][data].trial_date).toDateString():"-"} <br/> {resultant[item][data].trial_time?resultant[item][data].trial_time:"-"}
                              </div>
                            
                              <div className="trainer_name col-sm-4">
                              {resultant[item][data].name?resultant[item][data].name:"-"}({resultant[item][data].phone?resultant[item][data].phone:"-"})
                              </div>

                              <div className="col-sm-2" style={{color:"#bbfc6f"}}>
                              {resultant[item][data].status?resultant[item][data].status:"-"}
                              </div>

                              <div className="col-sm-2">
                              {resultant[item][data].trainer_category?
                              <div style={{backgroundColor:"orange",padding:"10px 15px 10px 15px",borderRadius:"10px",fontWeight:"bold",textAlign:"center"}}>
                                {resultant[item][data].trainer_category}
                              </div>
                              :"-"}
                              </div>

                              <div className="col-sm-1 more">
                                  <span>
                                    <i className="fa fa-chevron-down"></i>
                                  </span>
                              </div>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={j}>
                              <Card.Body>
                              <div className="row hidden">
                                <div className="col-sm-2">
                                  <span style={{fontWeight:"bold"}}>Address</span><br/>
                                  {resultant[item][data].address? resultant[item][data].address : "-" }<br/>
                                  {resultant[item][data].address? resultant[item][data].landmark : "-" }<br/>
                                  {resultant[item][data].address? resultant[item][data].area : "-" }<br/>
                                  {resultant[item][data].address? resultant[item][data].pincode : "-" }<br/>
                                </div>
                                <div className="col-sm-2">
                                  <span style={{fontWeight:"bold"}}>Assistance</span><br/>
                                  {resultant[item][data].assistance === "myself"? "My Self" : null }
                                  {resultant[item][data].assistance === "forothers"? "For Others" : null }
                                </div>
                                
                                <div className="col-sm-3">
                                  <span style={{fontWeight:"bold"}}>Paid Amount</span><br/>
                                  {resultant[item][data].bookamount? resultant[item][data].bookamount : "-" }
                                </div>
                                <div className="col-sm-2">
                                  <span style={{fontWeight:"bold"}}>Category</span><br/>
                                  {resultant[item][data].user_category? resultant[item][data].user_category : "-" }
                                </div>
                                <div className="col-sm-3">
                                  <span style={{fontWeight:"bold"}}>Trainer Assigned</span><br/>
                                  {resultant[item][data].TrainerName? resultant[item][data].TrainerName : "-" }<br/>
                                   {resultant[item][data].trainerId? resultant[item][data].trainerId : "-" }
                                </div>
                              </div>
                              <hr/>
                              <div className="row hidden">
                                <div className="col-sm-3">
                                <span style={{fontWeight:"bold"}}>Time Stamp</span><br/>
                                  {resultant[item][data].paymentDetails? resultant[item][data].paymentDetails.created_at : "-" }
                                </div>
                                <div className="col-sm-3">
                                <span style={{fontWeight:"bold"}}>Payment Method</span><br/>
                                  {resultant[item][data].paymentDetails? resultant[item][data].paymentDetails.method : "-" }
                                </div>
                                <div className="col-sm-3">
                                <span style={{fontWeight:"bold"}}>Wallet</span><br/>
                                  {resultant[item][data].paymentDetails? resultant[item][data].paymentDetails.wallet : "-" }
                                </div>
                              </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </div>
                        </div>
                        ))
                        :
                        null
                      }
                        </div>
                      ))
                    : null}
                    
                </Accordion>
          </div>
          
          
        )
    }
}

export default Home