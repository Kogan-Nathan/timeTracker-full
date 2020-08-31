import React, {useState, useEffect}  from 'react'
import Table from 'react-bootstrap/Table'

export default function RowProject(props) {

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
    // get client name for the project name, from the database 
    const getClient=()=>{
        let thisProject;
        for( let i in projectData){
            if(projectData[i]['projectName']===props.project.name){
                thisProject=projectData[i]['projectClient']
            }
        }
        return thisProject
    }

    return (
        <div>
            <Table className="tableProjects">
                <thead>
                    <tr>
                        <td> {props.project.name} </td>
                        <td>{getClient()}</td>
                        <td>{props.project.status} hrs</td>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}
