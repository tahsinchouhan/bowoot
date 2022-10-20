import React from "react"
import firebase from "firebase"

class RightBar extends React.Component{

  constructor(){
    super()
    this.state={
      result:[]
    }
  }

  componentDidMount(){
      firebase.database().ref("trainers").on("value",
      snapshot=>{
        let results=snapshot.val()
        this.setState({
          result:results
        })
      })
  }

    render(){
      let data=this.state.result
        return(
            <div className="col-md-2.5 color right-column">
            <div className="row session">
              <div className="col-sm-5.5 session-div">
                    On Going Session
                    <br/>
                    <b style={{color:"black"}}>23</b>
              </div>
              <div className="col-sm-5.5 session-div ">
                    Pending Sessions
                    <br/>
                    <b style={{color:"black"}}>23</b>
              </div>
            </div>
            <div className="row trainer-heading">
              <h4>Trainers</h4>
            </div>
            <div>
              <table class="table-table">
                <tr class="table-row">
                  <th class="table-head">Ratings</th>
                  <th class="table-head">Name</th>
                  <th class="table-head">Completed</th>
                  <th class="table-head">Rejected</th>
                </tr>
                { data ?
                    Object.keys(data).map((item,i) =>
                      <tr key={i} class="table-row">
                        <td class="table-data">4.5</td>
                        <td class="table-data">{data[item].profile ? data[item].profile.name: null }</td>
                        <td className="right table-data">34</td>
                        <td className="right table-data">12v</td>
                      </tr>
                    )
                  :
                    null
                }
                
              </table>
            </div>
          </div>
        )
    }
}

export default RightBar