import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import ReportRaw from './ReportRaw'
import { useSelector,useDispatch} from 'react-redux';
import {addWorkHours, updateUserStatus, updateStatus} from '../Actions'
import moment from 'moment' 


export default function Timetracker() {
    const token = localStorage.getItem('localToken')
    const IsLoggedInfo = useSelector(state=>state.isLogged)
    const users = useSelector(state=>state.Users)
    const [Projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    let usersDB=[];
    // const [usersDB, setUsersDB] = useState([]);
    const [projectName, setProjectName] = useState("");
    // const [userName, setUserName] = useState(usersDB[UserIndex].name);
    // const [userID, setUserID] = useState(usersDB[UserIndex].id);
    const [projectTo, setProjectTo] = useState();
    const [projectFrom, setProjectFrom] = useState();
    const [projectDate, setProjectDate] = useState();
    const [projectStatus, setProjectStatus] = useState()
    const [reportDescription,setReportDescription] = useState();
    const [reports,setReports] = useState([]);
    const [dbRender, setDbRender] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:9000/projects', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> setProjects(data))
        .catch(error=> console.error('Error: ', error)
        )

        fetch('http://localhost:9000/getToken', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> getUser(data))
        .catch(error=> console.error('Error: ', error)
        )
    },[dbRender]);


    async function getUser(id){
        await fetch('http://localhost:9000/users', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=>  usersDB=data)
        .catch(error=> console.error('Error: ', error))
        setUser(usersDB.filter(user=> user.email===id.userMail))
        handleReports(usersDB)
    }

    const handleReports = (usersDB) =>{
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data => reportsByUser(data))
        .catch(error=> console.error('Error: ', error)
        )

        setDbRender(true)
    }
    //----------------------------------------------------------
    const reportsByUser = (reportData) => {
            // filter by user id --- >
            if (user.length > 0){
            let tempReports =  reportData.filter(value => value.UserId===user[0].id)
            // console.log(tempReports);
            setReports(tempReports)
            } 
                  
    }
    //----------------------------------------------------------
    const total=()=>{        
        if (projectTo && projectFrom){
            let hours = moment.utc(moment(projectTo,"HH:mm").diff(moment(projectFrom,"HH:mm"))).format("HH:mm")
            setProjectStatus(hours)
        }
    }
    //----------------------------------------------------------
    const update=()=>{
        if(projectName&&projectFrom&&projectTo&&projectDate){
            let projectIndex = Projects.findIndex(value=> value.projectName===projectName)
            let userStatus = moment.duration(projectStatus)
            let singleReport = {UserName:user[0].name, UserID:user[0].id, ProjectName:projectName, Status:projectStatus, Date:projectDate, From:projectFrom, To:projectTo, Description:reportDescription}
            const url = 'http://localhost:9000/reports';
            const options = {
                method: 'POST',
                body: JSON.stringify(singleReport),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))

            let sendStatus = {status:projectStatus, userId:user.id, userStatus:user.status, projectId:Projects[projectIndex].projectID, projectStatus:Projects[projectIndex].projectStatus}
            
            const StatusUrl = 'http://localhost:9000/status';
            const StatusOptions = {
                method: 'PUT',
                body: JSON.stringify(sendStatus),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(StatusUrl, StatusOptions)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))

            renderPage()
        }
    }
    //----------------------------------------------------------
    const convertDate = (e) =>{
        let tempDate = e.target.value
        setProjectDate(tempDate)
        total ()
    }
    //----------------------------------------------------------
    const renderPage=()=>{
        setDbRender(!dbRender)
    }
    //----------------------------------------------------------
    
    return (
        <div>

            <div className="tableConatainer">
                <Table className="tableProjectsHeading">
                    <thead>
                        <tr className="trHeading">
                            <th> Project name </th>
                            <th> From </th>
                            <th> To </th>
                            <th> Date </th>
                            <th> Total  </th>
                        </tr> 
                    </thead>
                </Table>
                <div className="grid-userNewReport" style={{width:"100%", marginBottom:"20px"}}>
                    <select className=" inputTime select1" onChange={(e)=>setProjectName(e.target.value)}>
                        <option>Select Project</option>
                        {Projects.map((value,index)=>{return <option key={"project"+index}>{value.projectName}</option>})}
                    </select>
                    <div className="from"><input className="inputTime" type="time" placeholder="From" onChange={(e)=>setProjectFrom(e.target.value)}/></div>
                    <div className="to"><input className="inputTime" type="time" placeholder="To" onChange={(e)=>setProjectTo(e.target.value)}/></div>
                    <div className="dateinput"><input className="inputTime" type="date" placeholder="todays date" max={new Date().toISOString().split("T")[0]} onChange={convertDate}/></div>
                    <span className="totalhrs" style={{backgroundColor:"#242424", color:"#fff",padding:"15px"}}>total hrs: {projectStatus}</span>
                    <div className="select2"><input className="description inputTime" type="text" placeholder="you may add a description" onChange={(e)=>setReportDescription(e.target.value)}></input></div>
                    <button className="add-butt add-repo" onClick={update} > Add </button>
                </div>
            </div>
            {reports.map((value,index)=>{return <ReportRaw key={"report"+index} report={value}/>})}
            <div style={{margin:"50px"}}> </div>
        </div>
    )
}