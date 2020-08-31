import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ReportsTableByProject from './ReportsTableByProject'
import ReportsTableByUser from './ReportsTableByUser'
import ReportByProject from './ReportsByProject'
import ReportByUser from './ReportsByUser'
import ContentProject from './ContentProject'
import ContentUser from './ContentUser'
import AddProjectComp from './AddProjectComp'
import SearchComp from './SearchBar'
import Popup from './Popup'
import moment from 'moment' 


export default function AdminPage(props) {
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [ProjectsToBeDeleted, setProjectsToBeDeleted] = useState([])
    const [ProjectNamesToBeDeleted, setProjectNamesToBeDeleted] = useState([])
    const [UsersToBeDeleted, setUsersToBeDeleted] = useState([])
    const [UserNamesToBeDeleted, setUserNamesToBeDeleted] = useState([])
    const [SearchArray, setSearchArray] = useState([])
    const [SearchBar, setSearchBar] = useState("")
    const [dbRender, setDbRender] = useState(false)
    const [displayDropdown, setDisplayDropdown] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [selectedUser, setSelectedUser] = useState(NaN)
    const [showProjectPopup, setShowProjectPopup] = useState(false)
    const [selectedProject, setSelectedProject] = useState(NaN)

    useEffect(()=>{
        fetch('http://localhost:9000/projects')
        .then(response=> response.json())
        .then(data=> setProjects(data))
        .catch(error=> console.error('Error: ', error)
        )     
        fetch('http://localhost:9000/users')
        .then(response=> response.json())
        .then(data=> setUsers(data))
        .catch(error=> console.error('Error: ', error)
        ) 
    },[dbRender]);

    //----------------------------------------------------------
    // delete button dependency is isEmpty
    useEffect(()=>{
        if(ProjectNamesToBeDeleted.length>0 || UsersToBeDeleted.length>0){
            setIsEmpty(false)
        }
        else{
            setIsEmpty(true)
        }
    },[UsersToBeDeleted, ProjectsToBeDeleted])
    //---------------------------------------------------------- 
    const updateSearchBar=(value)=>{
        setSearchBar(value)
    }
    //---------------------------------------------------------- 
    const updateSearchArray=(value)=>{
        setSearchArray(value)
    }
    //---------------------------------------------------------- 
    const togglePopup=()=>{
        setShowPopup(!showPopup)
    }
    //---------------------------------------------------------- 
    const toggleUserPopup=()=>{
        setSelectedUser(NaN)
        setShowUserPopup(false)
    }
    //---------------------------------------------------------- 
    const toggleProjectPopup=()=>{
        setSelectedProject(NaN)
        setShowProjectPopup(false)
    }
    //----------------------------------------------------------
    const openUserReport=(user)=>{
        setSelectedUser(user)
        setShowUserPopup(true)
}
    //----------------------------------------------------------
    const openProjectReport=(project)=>{
        setSelectedProject(project)
        setShowProjectPopup(true)
    }
    //---------------------------------------------------------- 
    // add new project    
    function postProject(ProjectName, ProjectClient, ProjectManager, ProjectCost){
        let singleProject = {
            name:ProjectName,
            client:ProjectClient,
            status: '00:00',
            manager:ProjectManager,
            date:moment().format("YYYY-MM-DD"),
            cost:ProjectCost
        }
        
        const url = 'http://localhost:9000/projects';
        const options = {
            method: 'POST',
            body: JSON.stringify(singleProject),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(renderPage())
        .catch(error=> console.error('Error: ', error))
    }
    //----------------------------------------------------------  
    // delete users   
    function UpdateUsersToBeDeleted(UsersID, userName){
        if(UsersToBeDeleted.length===0){
            setUsersToBeDeleted(UsersToBeDeleted.concat(UsersID))
            setUserNamesToBeDeleted(UserNamesToBeDeleted.concat(userName))
        }
        else{
            let Index = UsersToBeDeleted.findIndex(value => value===UsersID)            
            if(Index!==-1){
                let tempID = UsersToBeDeleted.filter(value=> value!==UsersID);
                let tempName = UserNamesToBeDeleted.filter(value=> value!==userName);
                setUsersToBeDeleted(tempID,...UsersToBeDeleted)                    
                setUserNamesToBeDeleted(tempName,...UserNamesToBeDeleted)                    
            }
            if(Index===-1){
                setUsersToBeDeleted(UsersToBeDeleted.concat(UsersID))
                setUserNamesToBeDeleted(UserNamesToBeDeleted.concat(userName))
            }
        }
    }
    //---------------------------------------------------------- 
    // delete projects   
    function UpdateProjectsToBeDeleted(ProjectID,ProjectName){
        if(ProjectsToBeDeleted.length===0){
            setProjectsToBeDeleted(ProjectsToBeDeleted.concat(ProjectID))
            setProjectNamesToBeDeleted(ProjectNamesToBeDeleted.concat(ProjectName))
        }
        else{
            let Index = ProjectsToBeDeleted.findIndex(value => value===ProjectID)            
            if(Index!==-1){
                let tempID = ProjectsToBeDeleted.filter(value=> value!==ProjectID);
                let tempName = ProjectNamesToBeDeleted.filter(value=> value!==ProjectName);
                setProjectsToBeDeleted(tempID,...ProjectsToBeDeleted)                    
                setProjectNamesToBeDeleted(tempName,...ProjectNamesToBeDeleted)          
            }
            if(Index===-1){
                setProjectsToBeDeleted(ProjectsToBeDeleted.concat(ProjectID))
                setProjectNamesToBeDeleted(ProjectNamesToBeDeleted.concat(ProjectName))
            }
        }
    }
    //----------------------------------------------------------
    // send the info to be delete from database 
    const sendDeleteInfo=()=>{
        togglePopup()      
        if(props.displayPage==="Users"){
            const url = 'http://localhost:9000/users';
            const options = {
                method: 'DELETE',
                body: JSON.stringify(UsersToBeDeleted),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        if(props.displayPage==="Projects"){  
            const url = 'http://localhost:9000/projects';
            const options = {
                method: 'DELETE',
                body: JSON.stringify(ProjectsToBeDeleted),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))          
        }
        renderPage()
    }
    //----------------------------------------------------------
    const renderPage=()=>{
        setDbRender(!dbRender)
    }
    //----------------------------------------------------------
    const Display=()=>{
        if(props.displayPage==="Users"){
            if(SearchBar!==""){
                let sortedSearchArray = SearchArray.sort((a,b)=> {
                    let lowerCaseA = a.name.toLowerCase()
                    let lowerCaseB = b.name.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="scroll">
                    {sortedSearchArray.map(value=>{
                    return <div className="spaceForTable">
                        <ContentUser key={value.id} dataRender={renderPage} user={value}
                        update={UpdateUsersToBeDeleted}  usersDB={users}/>
                        </div>
                })}</div>)  
            } //if the search isnt empty it is showing the search result
            // and if it is empty it is showing the original users DB
            else{
                let sortedUsersArray = users.sort((a,b)=> {
                    let lowerCaseA = a.name.toLowerCase()
                    let lowerCaseB = b.name.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="scroll">
                    {sortedUsersArray.map(value=>{
                    return <div className="spaceForTable">
                        <ContentUser key={value.id} dataRender={renderPage} user={value}
                        update={UpdateUsersToBeDeleted} usersDB={users}/>
                        </div>
                })}</div>)                
            }
        }
        else if(props.displayPage==="Projects"){
            //if the search isnt empty it is showing the search result
            if(SearchBar!==""){
                let sortedSearchArray = SearchArray.sort((a,b)=> {
                    let lowerCaseA = a.projectName.toLowerCase()
                    let lowerCaseB = b.projectName.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="spaceForTable">
                        <div className="area">
                            <AddProjectComp projects={projects} sendNewProject={postProject}/>
                            <div className="scroll">
                            {sortedSearchArray.map(value=>{
                                return <ContentProject key={value.projectID} dataRender={renderPage} project={value}
                                update={UpdateProjectsToBeDeleted} projectsDB={projects}/>
                            })}</div>
                        </div>
                    </div>
                )
            } 
            // if the search input is empty it is showing the original users DB
            else{
                let sortedProjectsArray = projects.sort((a,b)=> {
                    let lowerCaseA = a.projectName.toLowerCase()
                    let lowerCaseB = b.projectName.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="spaceForTable">
                        <div className="area">
                            <AddProjectComp projects={projects} sendNewProject={postProject}/>
                            <div className="scroll">
                            {sortedProjectsArray.map(value=>{
                                return <ContentProject key={value.projectID} dataRender={renderPage} project={value}
                                update={UpdateProjectsToBeDeleted} projectsDB={projects}/>
                            })}</div>
                        </div>
                    </div>
                )                
            }
        }
        else if(props.displayPage==="Reports By User"){
            //if the search isnt empty it is showing the search result
            if(SearchBar!==""){
                let sortedSearchArray = SearchArray.sort((a,b)=> {
                    let lowerCaseA = a.name.toLowerCase()
                    let lowerCaseB = b.name.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="reportList">
                        <h4 className="hReports"> Select a user </h4>
                        {sortedSearchArray.map((user, index)=>{
                            return <ReportByUser key={"user"+index} user={user}
                                userDisplay={selectedUser} closeReports={toggleUserPopup} userReport={openUserReport}/>
                        })}
                    </div>
                )
            } 
            // if the search input is empty it is showing the original users DB
            else{
                let sortedUsersArray = users.sort((a,b)=> {
                    let lowerCaseA = a.name.toLowerCase()
                    let lowerCaseB = b.name.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="reportList">
                        <h4 className="hReports"> Select a user </h4>
                        {sortedUsersArray.map((user, index)=>{
                            return <ReportByUser key={"user"+index} user={user}
                                userDisplay={selectedUser} closeReports={toggleUserPopup} userReport={openUserReport}/>
                        })}
                    </div>
                )                
            }
        }
        else if(props.displayPage==="Reports By Project"){
            //if the search isnt empty it is showing the search result
            if(SearchBar!==""){
                let sortedSearchArray = SearchArray.sort((a,b)=> {
                    let lowerCaseA = a.projectName.toLowerCase()
                    let lowerCaseB = b.projectName.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="reportList">
                        <h4 className="hReports"> Select a project </h4>
                        {sortedSearchArray.map((project, index)=>{
                            return <ReportByProject key={"project"+index} project={project}
                                projectDisplay={selectedProject} closeReports={toggleProjectPopup} projectReport={openProjectReport}/>
                        })}
                    </div>
                )
            } 
            // if the search input is empty it is showing the original users DB
            else{
                let sortedProjectsArray = projects.sort((a,b)=> {
                    let lowerCaseA = a.projectName.toLowerCase()
                    let lowerCaseB = b.projectName.toLowerCase()
                    if (lowerCaseA < lowerCaseB) return -1;
                    else if (lowerCaseA > lowerCaseB) return 1;
                    return 0;
                })
                return(
                    <div className="reportList">
                        <h4 className="hReports"> Select a project </h4>
                        {sortedProjectsArray.map((project, index)=>{
                            return <ReportByProject key={"project"+index} project={project}
                                projectDisplay={selectedProject} closeReports={toggleProjectPopup} projectReport={openProjectReport}/>
                        })}
                    </div>
                )                
            }
        }
    }
    //----------------------------------------------------------
    const openBillboard=()=>{

    }

    const getHeaderReports=()=>{
        if(props.displayPage==="Reports By User"){
            return <h3 className="h-spesific"> Reports By User </h3> 
        }
        else if(props.displayPage==="Reports By Project"){
            return <h3 className="h-spesific"> Reports By Project </h3> 
        }
        else if(props.displayPage==="Users"){
            return <h3 className="h-spesific"> Users </h3> 
        }
        else if(props.displayPage==="Projects"){
            return <h3 className="h-spesific"> Projects </h3> 
        }
    }

    return (
        <div className="main">
            <div className="nav-bar_container">
                <ul className="navbar">      
                    <Link className="nav-links" to="/admin/users">Users</Link>
                    <Link className="nav-links" to="/admin/projects">Projects</Link>
                    <div onClick={()=>{setDisplayDropdown(!displayDropdown)}}>
                        <button className="nav-links">Reports</button>
                        {displayDropdown? <div><Link style={{marginTop:"-10px"}} className="sub-nav-link" to="/admin/reports-by-user">By User</Link>
                        <Link className="sub-nav-link" to="/admin/reports-by-project">By Project</Link>
                        </div> : ""}
                    </div>
                    <button className="billboardButt" value="Billboard" onClick={openBillboard}>
                        billboard
                    </button>
                </ul>
            </div>
            <div className="container">
                {getHeaderReports()}
                <SearchComp displayPage={props.displayPage} Projects={projects} Users={users} SearchValue={updateSearchBar} SearchArray={updateSearchArray}
                    DeletePopup={togglePopup} Empty={isEmpty}/>
                {props.isReport?
                    <div style={{display:"flex"}}>
                        {Display()}
                        {showProjectPopup ? <ReportsTableByProject closeReports={toggleProjectPopup} project={selectedProject}/> : null}
                        {showUserPopup ? <ReportsTableByUser user={selectedUser}/> : null}
                    </div>
                    : <div>
                        {Display()}
                    </div>
                }
            </div>
            {showPopup ? <Popup closePopup={togglePopup} delete={sendDeleteInfo} usersArray={UserNamesToBeDeleted} projectsArray={ProjectNamesToBeDeleted}/> : null}
        </div> 
    )
}