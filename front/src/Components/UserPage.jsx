import React from 'react'
import Nav from './Nav'
import Timetracker from './Timetracker'
import Last7days from './Last7days'
import Project from './Project'
import Users from './Users'
import ThisMonth from './ThisMonth'
import SpesificTime from './SpesificTime'

export default function AdminPage(props) {
    //----------------------------------------------------------
    const Display=()=>{
        if(props.displayPage==="Users"){
            return <Users/>
        }
        else if(props.displayPage==="Project"){
            return <Project/>
        }
        else if(props.displayPage==="Last 7 days"){
            return <Last7days/>
        }
        else if(props.displayPage==="This month"){
            return <ThisMonth/>
        }
        else if(props.displayPage==="Spesific time"){
            return <SpesificTime/>
        }
        else if(props.displayPage==="Timetracker"){
            return <Timetracker/>
        }
    }
    //----------------------------------------------------------

    return (
        <div className="main">
            <Nav/>
            {Display()}
        </div>
    )
}