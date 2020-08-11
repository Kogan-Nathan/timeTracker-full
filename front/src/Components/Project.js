import React, {useState, useEffect} from 'react'
import RowProject from './RowProject'
import Table from 'react-bootstrap/Table'

export default function Project() {
    const [projectData, setProjectData] = useState([]);

    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/projects')
        .then(response=> response.json())
        .then(data=>{
            if(!isCanclled){
                setProjectData(data)
            }})
        .catch(error=> console.error('Error: ', error)
        )

        return()=>{
            isCanclled = true
        }
    },[]);
    //----------------------------------------------------------
    return (
        <div>
            <div className="tableConatainer tableProjects">
                <Table className="tableProjectsHeading">
                    <thead className="trHeading">
                        <tr>
                            <th> project name </th>
                            <th> client  </th>
                            <th> status  </th>
                        </tr> 
                    </thead>
                </Table>
            </div>
            {projectData.map((value,index)=>{return <RowProject key={"project"+index} project={value}/>})}
        </div>    
    )
}