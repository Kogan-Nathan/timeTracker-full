import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

export default function RowSummary(props) {

    const [projectData, setProjectData] = useState([]);

    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/projects')
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled){
                setProjectData(data)
            }})
        .catch(error=> console.error('Error: ', error))
        
        return()=>{
            isCanclled = true
        }
    },[]);
    //----------------------------------------------------------
    // change the format we get from to moment library to "00:00"
    const totaltimeCalc=()=>{
        let fromTime = props.report.From;
        let toTime = props.report.To;
        let hours = moment.utc(moment(toTime,"HH:mm").diff(moment(fromTime,"HH:mm"))).format("HH:mm")
        return hours
    }
    //----------------------------------------------------------
    // get client name for the project name, from the database 
    const getClient=()=>{
        let thisProject;
        for( let i in projectData){
            if(projectData[i]['projectName']===props.report.ProjectName){
                thisProject=projectData[i]['projectClient']
            }
        }
        return thisProject
    }
    //----------------------------------------------------------
    return (
        <div>
            <Table className="tableProjects">
                <thead>
                    <tr>
                        <td className="summaryTd">{props.report.ProjectName}</td>
                        <td className="summaryTd">{getClient()}</td>
                        <td className="summaryTd">{totaltimeCalc()} hrs</td>
                        <td className="summaryTd">{moment(props.report.Date).format("DD-MM-YY")}</td>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}