import React, {useState, useEffect} from 'react'
import  { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import RowReport from './RowReport'
import LoadingSpinner from './LoadingSpinner'
import moment from 'moment' 

export default function Timetracker() {
    const token = useSelector(state=>state.isLogged.token)
    const [Projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    let usersDB=[];
    const [projectName, setProjectName] = useState("");
    const [projectFinish, setProjectFinish] = useState();
    const [projectStart, setProjectStart] = useState();
    const [projectDate, setProjectDate] = useState();
    const [projectStatus, setProjectStatus] = useState()
    const [reportDescription,setReportDescription] = useState();
    const [reports,setReports] = useState([]);
    const [dbRender, setDbRender] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        let isCanclled = false;
        fetch('http://localhost:9000/projects', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled) {
                setProjects(data)
            }})
        .catch(error=> console.error('Error: ', error)
        )

        fetch('http://localhost:9000/getIndex', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled) {
            getUser(data)
            }})
        .catch(error=> console.error('Error: ', error)
        )

        return()=>{
            isCanclled = true;
        }  
    },[dbRender]);
    //----------------------------------------------------------
    // set the logged in user with the token information
    async function getUser(id){
        await fetch('http://localhost:9000/users')
        .then(response=> response.json())
        .then(data=>  usersDB=data)
        .catch(error=> console.error('Error: ', error))
        setUser(usersDB.filter(user=> user.id===id))
        handleReports()
    }
    //----------------------------------------------------------
    // get the reports by the user from server
    const handleReports = () =>{
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data => reportsByUser(data))
        .then(setIsLoading(false))
        .catch(error=> console.error('Error: ', error))
    }
    //----------------------------------------------------------
    // set state with all the reports
    const reportsByUser = (reportData) => {
        let sortedReports = reportData.sort((a,b) => new Date(b.Date) - new Date(a.Date))
        setReports(sortedReports)         
    }
    //----------------------------------------------------------
    // checks if all the inputs are filled
    const update=(e)=>{
        e.preventDefault()
        if(projectName&&projectStart&&projectFinish&&projectDate){
            // get the index of the project
            let projectIndex = Projects.findIndex(value=> value.projectName===projectName)
            // send the new report to update the reports database
            let singleReport = {
                UserName:user[0].name,
                UserID:user[0].id,
                ProjectName:projectName,
                ProjectId:Projects[projectIndex].projectID,
                Status:projectStatus,
                Date:projectDate,
                From:projectStart,
                To:projectFinish,
                Description:reportDescription
            }

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
            // send the new report to update the user status and project status in database
            let sendStatus = {
                status:projectStatus,
                userId:user[0].id,
                userStatus:user[0].status,
                projectId:Projects[projectIndex].projectID,
                projectStatus:Projects[projectIndex].projectStatus
            }
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
        setProjectDate(e.target.value)
    }
    //----------------------------------------------------------
    // set the state when projectStart / projectFinish / projectDate updates 
    // calculating the total hours for new report, and formating it to "00:00"
    useEffect(()=>{       
        if (projectFinish && projectStart){
            let hours = moment.utc(moment(projectFinish,"HH:mm").diff(moment(projectStart,"HH:mm"))).format("HH:mm")
            setProjectStatus(hours)
        }
    },[projectFinish, projectStart, projectDate])
    //----------------------------------------------------------
    // set the state only when projectStart updates
    useEffect(()=>{ 
        if(projectStart){
            setProjectStart(projectStart)
        }
    },[projectStart]);
    //----------------------------------------------------------
    // set the state only when projectStart updates
    useEffect(()=>{ 
        if(projectFinish){
            setProjectFinish(projectFinish)
        }
    },[projectFinish]);
    //----------------------------------------------------------
    const handleStart=(e)=>{
        setProjectStart(e.target.value)
    }

    const handleFinish=(e)=>{
        setProjectFinish(e.target.value)
    }
    //----------------------------------------------------------
    const renderPage=()=>{
        setDbRender(!dbRender)
    }
    //----------------------------------------------------------
    // displays different content while loading
    const display=()=>{
        if (isLoading) {
            return(
                <LoadingSpinner/>
            )
        }
        else{
            return(
                <div className="container">
                    <div className="tableConatainer tableProjects">
                        <Table className="tableProjectsHeadingUser">
                            <thead>
                                <tr className="trHeading">
                                    <th> Project name </th>
                                    <th> Start </th>
                                    <th> Finish </th>
                                    <th> Date </th>
                                    <th> Total  </th>
                                </tr> 
                            </thead>
                        </Table>
                        <form onSubmit={update}>
                        <div className="grid-userNewReport" style={{width:"100%", marginBottom:"20px"}}>
                            <select className="inputTime select1" onChange={(e)=>setProjectName(e.target.value)} required>
                                <option>Select Project</option>
                                {Projects.map((value,index)=>{
                                    return <option key={"project"+index}>{value.projectName}</option>
                                })}
                            </select>
                            <div className="inputTime">
                                <input required className="inputTime" type="time" onChange={handleStart}/>  
                            </div>
                            <div className="inputTime">
                                <input required className="inputTime" type="time" onChange={handleFinish}/>
                            </div>
                            <div className="dateinput">
                                <input required className="inputTime" type="date" placeholder="todays date" max={new Date().toISOString().split("T")[0]}
                                    onChange={convertDate}/>
                            </div>
                            <span className="totalhrs" style={{backgroundColor:"#242424",color:"#fff",padding:"20px 15px"}}>
                                Total hrs: {projectStatus}
                            </span>
                            <div className="select2">
                                <input className="description inputTime" type="text" placeholder="you may add a description"
                                    onChange={(e)=>setReportDescription(e.target.value)}/>
                                </div>
                            <button type="submit" className="add-butt add-repo"> Add </button>
                        </div>
                        </form>
                    </div>
                    <div className="scroll">
                        {reports.map((value,index)=>{return <RowReport key={"report"+index} report={value}/>})}
                    </div>
                    <div style={{margin:"50px"}}> </div>
                </div>
            )
        }
    }
    //----------------------------------------------------------
    return (
        <div>
            {display()}
        </div>
    )
}