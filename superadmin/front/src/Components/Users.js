import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
// import {useSelector} from 'react-redux'
import UsersRow from './UsersRaw'


export default function Users() {
    const token = localStorage.getItem('localToken')
    // const usersData = useSelector(state => state.Users);
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:9000/users', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> setUsersData(data))
        .catch(error=> console.error('Error: ', error)
        )
    },[]);

    return (
        <div>
            <div className="tableConatainer tableProjects">
            <Table className="tableProjectsHeading">
                <thead className="trHeading">
                    <tr>
                        <th> name </th>
                        <th> email  </th>
                        <th> projects  </th>
                    </tr>
                </thead> 
            </Table>
            </div>
            {usersData.map((value,index)=>{return <UsersRow key={"user"+index} user={value}/>})}
        </div>
    )
}