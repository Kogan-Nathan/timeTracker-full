import React,{useState, useEffect} from 'react'
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';
import { FaDollarSign } from 'react-icons/fa';
import moment from 'moment'

export default function UserArea(props) {
    
    const [ProjectName, setProjectsName] = useState("")
    const [ProjectClient, setProjectClient] = useState("")
    const [ProjectManager, setProjectManager] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [DollarClass, setDollarClass] = useState(props.project.projectCost)
    const [reports, setReports] = useState();
    const projects = props.projectsDB

    useEffect(()=>{
        fetch('http://localhost:9000/allreports')
        .then(response=> response.json())
        .then(data=> setReports(data))
        .catch(error=> console.error('Error: ', error)
        ) 
    },[projects]);
    //----------------------------------------------------------
    const changeClass=()=>{
        setDollarClass(!DollarClass)
    }
    //----------------------------------------------------------
    // manipulates the hidden area
    const toggle=()=>{
        setIsOpen(!isOpen)        
    }
    //----------------------------------------------------------
    const totalWorkersCalc=()=>{
        let projectReportArray = reports.filter(value=> value.ProjectName===props.project.projectName)
        let workersAmount = [];
        let uniqueObject ={};
        // Loop for the array elements
        for(let i in projectReportArray){
            // Extract the title
            let workersName = projectReportArray[i]['UserName'];
            // Use the title as the index
            uniqueObject[workersName] = projectReportArray[i];
        }
        // Loop to push unique object into array
        for(let i in uniqueObject){
            workersAmount.push(uniqueObject[i]);
        }
        return workersAmount.length
    }
    //----------------------------------------------------------
    const convertStatus=(convertHours)=>{
        let totalTime = moment.duration(convertHours, 'hours');
        let hours = Math.floor(totalTime.asHours());
        let mins  = Math.floor(totalTime.asMinutes()) - hours * 60;
        hours = ((hours > 9) ? hours : ("0"+hours))
        mins = ((mins > 9) ? mins : ("0"+mins))
        let result = hours + ":" + mins;
        return result
    }
    //----------------------------------------------------------
    const checkUpdates=()=>{
        let existingProjectIndex = projects.findIndex(value=> value.projectName === props.project.projectName)
        let checkProjectNameIndex = projects.findIndex(value=> value.projectName === ProjectName)
        if(existingProjectIndex!==-1&&checkProjectNameIndex===-1){
            if(ProjectName!==""){    
                let singleProject = {id:props.project.projectID, name:ProjectName}
                const url = 'http://localhost:9000/projects/name';
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(singleProject),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())
                .catch(error=> console.error('Error: ', error))
            }
            
            if(ProjectManager!==""){
                let singleProject = {id:props.project.projectID, manager:ProjectManager}
                const url = 'http://localhost:9000/projects/manager';
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(singleProject),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())
                .catch(error=> console.error('Error: ', error))
            }
            if(ProjectClient!==""){
                let singleProject = {id:props.project.projectID, client:ProjectClient}
                const url = 'http://localhost:9000/projects/client';
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(singleProject),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())
                .catch(error=> console.error('Error: ', error))
            }
            let singleProject = {id:props.project.projectID, cost:DollarClass}
            const url = 'http://localhost:9000/projects/cost';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleProject),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))

        }else{
            alert("Sorry, this project name is alread in use")
        }
        props.dataRender()
        setIsOpen(!isOpen)
    }
    //----------------------------------------------------------
    const sendInfo=()=>{
        props.update(props.project.projectID)
    }


    return (
        <div className="area">
            <div className="grid-infoProject">
                <div className="c"></div>
                <input className="checkbox del" type="checkbox" onChange={sendInfo}/>
                {isOpen? <div className="border-simple grid-projectAddAdminInfo">
                    <GoTriangleUp className="color-zan cursor" onClick={toggle}/>
                    <div className="arrow-projectname"><input className="inputTime" type="text" placeholder={props.project.projectName} onChange={(e)=>{setProjectsName(e.target.value)}}/></div>
                    <FaDollarSign className={DollarClass? "cursor color-zan  arrow-clientname" : "cursor color  arrow-clientname"} onClick={changeClass}/>
                    <div className="clientinput"><p>Client: </p><input className="inputTime clientinput" type="text" placeholder={props.project.projectClient} onChange={(e)=>{setProjectClient(e.target.value)}}/></div>
                    <div className="pm"><p>PM: </p><input type="text" className="inputTime" placeholder={props.project.projectManager} onChange={(e)=>{setProjectManager(e.target.value)}}/></div>
                    <div className="date">Start Date: {moment(props.project.projectDate).format("YYYY-MM-DD")}</div>
                    <div className="grid-projectAddAdminInfoLast">
                    <p className="workers">Total Workers: {totalWorkersCalc()}</p>
                        <p className="status">Status: {convertStatus(props.project.projectStatus)}h</p>
                        <button className="addButton addAdmin-butt add-butt" onClick={checkUpdates}>Update Info</button>        
                    </div>
                    </div> :
                    <div className="border-simple grid-projectSmallInfo">
                        <GoTriangleDown className="color-zan cursor arrow" onClick={toggle}/>
                        <p className="nameproject">{props.project.projectName}</p>
                        <FaDollarSign className={props.project.projectCost? "color-zan dollarsign" : "color dollarsign"}/>
                        <p className="clientName">Client: {props.project.projectClient}</p>
                        <p className="pmanager">PM: {props.project.projectManager}</p>
                    </div>
                }
            </div>
        </div>
    )    
}