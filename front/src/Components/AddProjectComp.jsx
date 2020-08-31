import React,{useState} from 'react'
import { GoTriangleRight } from 'react-icons/go';
import { FaDollarSign } from 'react-icons/fa';

export default function AddProjectComp(props){

    const [ProjectManager, setProjectManager] = useState()
    const [ProjectClient, setProjectClient] = useState()
    const [ProjectName, setProjectsName] = useState()
    const [ProjectCost, setProjectCost] = useState(false)
    
    //----------------------------------------------------------
    // check if the project contains all the right info
    const checkUpdates=()=>{
        if(props.projects.length===0){
            if(ProjectName!==undefined){
                if(ProjectClient!==undefined){
                    if(ProjectManager!==undefined){
                        props.sendNewProject(ProjectName, ProjectClient, ProjectManager, ProjectCost)
                    }
                    else{alert("Sorry, Project must contain Project Manager")}
                }
                else{alert("Sorry, Project must contain Client")}
            }
            else{alert("Sorry, Project must contain Name")}
        }
        else{
            let projectIndex = props.projects.findIndex(value=> value.projectName === ProjectName)
            if(projectIndex===-1){
                if(ProjectName===undefined){
                    alert("Sorry, Project must contain Name")
                }
                else{
                    if(ProjectClient!==undefined){
                        if(ProjectManager!==undefined){
                            props.sendNewProject(ProjectName, ProjectClient, ProjectManager, ProjectCost)
                        }
                        else{alert("Sorry, Project must contain Project Manager")}
                    }
                    else{alert("Sorry, Project must contain Client")}
                }
            }
            else{alert("Sorry, this project name is alread in use")}
        }
    }
    //----------------------------------------------------------

    return (
        <div className="grid-projectAddInfo">
            <div className="arrowbefore">
                <GoTriangleRight className="color-zan"/>
            </div>
            <div className="arrow-projectname">
                <input className="inputTime" type="text" placeholder="Project Name"
                onChange={(e)=>{setProjectsName(e.target.value)}}/>
            </div>
            <div className="arrow-clientname">
            <FaDollarSign className={ProjectCost? "color-zan cursor" : "cursor color"}
                onClick={()=>{setProjectCost(!ProjectCost)}}/>
            </div>
            <div className="clientinput">
                <p>Client:  </p>
                <input className="inputTime clientinput" type="text" placeholder="Clients Name"
                onChange={(e)=>{setProjectClient(e.target.value)}}/>
            </div>
                <div className="arrow-projectman">
                <p>PM:  </p>
                <input className="inputTime arrow-projectman" type="text" placeholder="Project Manager"
                onChange={(e)=>{setProjectManager(e.target.value)}}/>
            </div>
            <div className="addnew">
                <button className="add-butt addnew" onClick={checkUpdates}>Add Project</button>
            </div>
        </div>
    )
}