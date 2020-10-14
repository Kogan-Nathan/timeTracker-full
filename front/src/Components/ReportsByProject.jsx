import React from 'react'
import { GoTriangleRight } from 'react-icons/go';
import { GoTriangleDown } from 'react-icons/go';

export default function ReportsByProject(props) {

    //----------------------------------------------------------
    const openProjectReport=(project)=>{
        props.projectReport(project)
    }
    //---------------------------------------------------------- 
    const toggleProjectPopup=()=>{
        props.closeReports()
    }
    
    const showTriangle=()=>{
        if(props.projectDisplay===props.project.projectID){
            return <GoTriangleRight onClick={toggleProjectPopup} className="color-zan cursor"/>
        }
        else if(isNaN(props.projectDisplay)){
            return <GoTriangleDown onClick={()=>{openProjectReport(props.project.projectID)}} className="color-zan cursor"/>
        }
        else{
            return <div style={{width:"16px", height:"16px", display:"inline-block"}}> </div>
        }
    }

    return (
        <div className="reportItem">
            {showTriangle()}
            <span>{props.project.projectName}</span>
        </div>
    )
}