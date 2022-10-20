import React from "react"
import firebase from "firebase"

class History extends React.Component{
    constructor(){
        super()
        this.state={
            result:[],
            result2:[],
            uid:'' 
        }
    }

    componentDidMount(){
        firebase.database().ref("serviceHistory").on("value",
        snapshot => {
            let results=snapshot.val()
            this.setState({
                result:results
            })
        })

        firebase.database().ref("users").on("value",
        snapshot => {
            let results2=snapshot.val()
            this.setState({
                result2:results2
            })
        })
    }

    render(){
        let resultant=this.state.result
        let resultant2=this.state.result2
        let table=[]
        { Object.keys(resultant).map((item, i) => {
            Object.keys(resultant[item]).map((tran , j) =>{
                table.push(<tr className="service-row" key={j}>
                        <td className="table-padding">{resultant2[resultant[item][tran].SeviceRequestedBy]?(<span>{resultant2[resultant[item][tran].SeviceRequestedBy].profile.name}({resultant[item][tran].SeviceRequestedBy})</span>):"-"}</td>
                        {/* <td className="table-padding">{resultant[item][tran].created?Object.keys(resultant[item][tran].created).map((create,k)=>(<span key={k}>{resultant[item][tran].created[create]}</span>)):"-"}</td> */}
                        <td className="table-padding">{resultant[item][tran].timestamp?new Date(resultant[item][tran].timestamp).toGMTString():"-"}</td>
                    </tr> )  
            })
        })}
        return(
            <div className="col render">
                <span className="dashboard-logo">HISTORY</span> 
                <div className="padding-top">
                    <div className="view-con">
                    <div>
                            <table className="table-service">
                                <tr style={{fontWeight:"100"}}>
                                    <th className="table-padding">Requested By</th>
                                    {/* <th className="table-padding">Created</th> */}
                                    <th className="table-padding">Time Stamp</th>
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

export default History