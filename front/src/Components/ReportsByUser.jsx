import React from 'react'
import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleDown } from 'react-icons/go';

export default function ReportByUser(props) {

    //----------------------------------------------------------
    const openUserReport=(user)=>{
        props.userReport(user)
    }
    //---------------------------------------------------------- 
    const toggleUserPopup=()=>{
        props.closeReports()
    }
    
    const showTriangle=()=>{
        if(props.userDisplay===props.user.id){
            return <GoTriangleRight onClick={toggleUserPopup} className="color-zan cursor"/>
        }
        else if(isNaN(props.userDisplay)){
            return <GoTriangleDown onClick={()=>{openUserReport(props.user.id)}} className="color-zan cursor"/>
        }
        else{
            return <div style={{width:"16px", height:"16px", display:"inline-block"}}> </div>
        }
    }

    return (
        <div className="reportItem">
            {showTriangle()}
            <span>{props.user.name}</span>
        </div>
    )
}