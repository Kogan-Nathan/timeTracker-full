import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import RowUsers from './Mapping/RowUsers'

export default function Users(props) {
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/users', {headers: {'company-name' : props.company}})
        .then(response=> response.json())
        .then(data=>{
            if(!isCanclled){
                setUsersData(data)
            }})
        .catch(error=> console.error('Error: ', error))

        return()=>{
            isCanclled = true
        }
    },[]);
    //----------------------------------------------------------
    return (
        <div className="container">
            <div className="tableConatainer tableProjects">
            <Table className="tableProjectsHeadingUser">
                <thead className="trHeading">
                    <tr>
                        <th> Name </th>
                        <th> Email  </th>
                        <th> Phone  </th>
                    </tr>
                </thead> 
            </Table>
            </div>
            <div className="scroll">
            {usersData.map( value =>{return <RowUsers key={value.id} user={value}/>})}
            </div>
        </div>
    )
}