import React from 'react'
import { useHistory } from "react-router-dom";
import Timetracker from './Timetracker'
import Last7days from './Last7days'
import Project from './Project'
import Users from './Users'
import ThisMonth from './ThisMonth'
import SpesificTime from './SpesificTime'

export default function UserPage(props) {

    const UserIndex= props.userid
    const history = useHistory();
    //----------------------------------------------------------
    // changes visual information
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
    // changes url by navigation
    const changeLocation = (e) =>{
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
    //----------------------------------------------------------
    return (
        <div className="main">
            <div className="nav-bar_container">
                <ul className="navbar">       
                    <button className="nav-links" value="TimeTracker" onClick={(e)=>changeLocation(e)}>
                        TimeTracker
                    </button>
                    <select className="select-box" onChange={(e)=>changeLocation(e)}>
                        <option className="select-items" style={{display:"none"}}>
                            Summary
                        </option>
                        <option className="select-items" value="last 7 days">
                            Last 7 days
                        </option>
                        <option className="select-items" value="this month">
                            This month
                        </option>
                        <option className="select-items" value="spesific time">
                            Spesific time
                        </option>
                    </select>
                    <button className="nav-links" value="Projects" onClick={(e)=>changeLocation(e)}>
                        Projects
                    </button>
                    <button className="nav-links" value="Users" onClick={(e)=>changeLocation(e)}>
                        Users
                    </button>
                </ul>
            </div>
            {Display()}
        </div>
    )
}