import React, {useEffect, useState} from 'react'
import  { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Timetracker from './Timetracker'
import Last7days from './Last7days'
import Project from './Project'
import Users from './Users'
import ThisMonth from './ThisMonth'
import SpesificTime from './SpesificTime'

export default function AdminPage(props) {

    const token = useSelector(state=>state.isLogged.token)
    const [UserIndex, setUserIndex] = useState(NaN)
    const history = useHistory();
    const [dbRender, setDbRender] = useState(false)

    useEffect(()=>{  
        fetch('http://localhost:9000/getIndex', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=>setUserIndex(data))
        .catch(error=> console.error('Error: ', error))
    },[dbRender]);

    const renderPage=()=>{
        setDbRender(!dbRender)
    }

    //----------------------------------------------------------
    const Display=()=>{
        if(props.displayPage==="Users"){
            return <Users index={UserIndex}/>
        }
        else if(props.displayPage==="Project"){
            return <Project index={UserIndex}/>
        }
        else if(props.displayPage==="Last 7 days"){
            return <Last7days index={UserIndex}/>
        }
        else if(props.displayPage==="This month"){
            return <ThisMonth index={UserIndex}/>
        }
        else if(props.displayPage==="Spesific time"){
            return <SpesificTime index={UserIndex}/>
        }
        else if(props.displayPage==="Timetracker"){
            return <Timetracker index={UserIndex}/>
        }
    }
    //----------------------------------------------------------
    const changeLocation = (e) =>{
        renderPage()
        if (e.target.value === "last 7 days"){
            history.push('/last7days/user='+UserIndex) 
        }
        if (e.target.value === "this month"){
            history.push('/thismonth/user='+UserIndex)
        }
        if (e.target.value === "spesific time"){
            history.push('/spesifictime/user='+UserIndex)
        }
        if (e.target.value === "TimeTracker"){
            history.push('/timetracker/user='+UserIndex)
        }
        if (e.target.value === "Projects"){
            history.push('/project/user='+UserIndex) 
        }
        if (e.target.value === "Users"){
            history.push('/users/user='+UserIndex)    
        }
    }


    return (
        <div className="main">
            <div className="nav-bar_container">
                <ul className="navbar">       
                    <button className="nav-links" value="TimeTracker" onClick={(e)=>changeLocation(e)}>TimeTracker</button>
                    <select className="select-box" onChange={(e)=>changeLocation(e)}>
                        <option className="select-items">Summary</option>
                        <option className="select-items" value="last 7 days">last 7 days</option>
                        <option className="select-items" value="this month">this month</option>
                        <option className="select-items" value="spesific time">spesific time</option>
                    </select>
                    <button className="nav-links" value="Projects" onClick={(e)=>changeLocation(e)}>Projects</button>
                    <button className="nav-links" value="Users" onClick={(e)=>changeLocation(e)}>Users</button>

                </ul>
            </div>
            {Display()}
        </div>
    )
}