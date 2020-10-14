import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

export default function SummaryRow(props) {

    const [projectData, setProjectData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:9000/projects')
        .then(response=> response.json())
        .then(data=> setProjectData(data))
        .catch(error=> console.error('Error: ', error))
        
    },[]);

    const totaltimeCalc=()=>{
        let fromTime = props.report.From;
        let toTime = props.report.To;
        let hours = moment.utc(moment(toTime,"HH:mm").diff(moment(fromTime,"HH:mm"))).format("HH:mm")
        return hours
    }
    //----------------------------------------------------------
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
                        <td className="summaryTd"> {props.report.ProjectName} </td>
                        <td className="summaryTd">{getClient()}</td>
                        <td className="summaryTd">{totaltimeCalc()} hrs</td>
                        <td className="summaryTd">{moment(props.report.Date).format("DD-MM-YY")}</td>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}