import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
// import { useSelector} from 'react-redux';
import ProjectRow from './ProjectRow'

export default function Project() {
    // const projectData = useSelector(state => state.Projects);
    const token = localStorage.getItem('localToken')
    const [projectData, setProjectData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:9000/projects', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> setProjectData(data))
        .catch(error=> console.error('Error: ', error)
        )
    },[token]);
    
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
            {projectData.map((value,index)=>{return <ProjectRow key={"project"+index} project={value}/>})}
        </div>    
    )
}