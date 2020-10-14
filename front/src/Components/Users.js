import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import RowUsers from './RowUsers'

export default function Users() {
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/users')
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
            {usersData.map((value,index)=>{return <RowUsers key={"user"+index} user={value}/>})}
            </div>
        </div>
    )
}