import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ContentProject from './ContentProject'
import ContentUser from './ContentUser'
import Popup from './Popup'
import { GoTriangleRight } from 'react-icons/go';
import { FaDollarSign } from 'react-icons/fa';
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
    const [ProjectManager, setProjectManager] = useState()
    const [ProjectClient, setProjectClient] = useState()
    const [ProjectName, setProjectsName] = useState()
    const [ProjectCost, setProjectCost] = useState(false)
    const [dbRender, setDbRender] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

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
    const togglePopup=()=>{
        setShowPopup(!showPopup)
    }
    //---------------------------------------------------------- 
    // add new project    
    function postProject(){
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
            // let tempProjects =  state.filter(value => !action.projectsToBeDeletedData.includes(value.projectName))
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
    const searchInput=(e)=>{
        //onKeyUp search updates a temporary array that is displayed through map 
        if(props.displayPage==="Users"){
            let tempArray = users.filter(value => {
            let lowerCaseName = value.name.toLowerCase();
                for (let index = 0; index < lowerCaseName.length; index++) {
                    if(lowerCaseName.indexOf(e.target.value)===0){
                        return true
                    }
                    else{
                        return false
                    }
                }
            })
            setSearchArray(tempArray)
        }
        if(props.displayPage==="Projects"){
            let tempArray = projects.filter(value => {
            let lowerCaseName = value.projectName.toLowerCase();
                for (let index = 0; index < lowerCaseName.length; index++) {
                    if(lowerCaseName.indexOf(e.target.value)===0){
                        return true
                    }
                    else{
                        return false
                    }
                }
            })
            setSearchArray(tempArray)
        }
        setSearchBar(e.target.value)
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
    // check if the project contains all the right info
    const checkUpdates=()=>{
        if(projects.length===0){
            if(ProjectName!==undefined){
                if(ProjectClient!==undefined){
                    if(ProjectManager!==undefined){
                        postProject()
                    }
                    else{alert("Sorry, Project must contain Project Manager")}
                }
                else{alert("Sorry, Project must contain Client")}
            }
            else{alert("Sorry, Project must contain Name")}
        }
        else{
            let projectIndex = projects.findIndex(value=> value.projectName === ProjectName)
            if(projectIndex===-1){
                if(ProjectName===undefined){
                    alert("Sorry, Project must contain Name")
                }
                else{
                    if(ProjectClient!==undefined){
                        if(ProjectManager!==undefined){postProject()}
                        else{alert("Sorry, Project must contain Project Manager")}
                    }
                    else{alert("Sorry, Project must contain Client")}
                }
            }
            else{alert("Sorry, this project name is alread in use")}
        }
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
                return((sortedSearchArray.map(value=>{
                    return <ContentUser key={value.id} dataRender={renderPage} user={value}
                    update={UpdateUsersToBeDeleted}  usersDB={users}/>
                })))   
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
                return((sortedUsersArray.map(value=>{
                    return <ContentUser key={value.id} dataRender={renderPage} user={value}
                    update={UpdateUsersToBeDeleted} usersDB={users}/>
                })))                
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
                    <div className="area">
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
                        {sortedSearchArray.map(value=>{
                            return <ContentProject key={value.projectID} dataRender={renderPage} project={value}
                            update={UpdateProjectsToBeDeleted} projectsDB={projects}/>
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
                    <div className="area">
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
                        {sortedProjectsArray.map(value=>{
                            return <ContentProject key={value.projectID} dataRender={renderPage} project={value}
                            update={UpdateProjectsToBeDeleted} projectsDB={projects}/>
                            })}
                    </div>
                )                
            }
        }
    }
    //----------------------------------------------------------
    return (
        <div className="main">
            <div className="adminNav-grid">
                <div className="a"></div>         
                <div className={props.class? "active a" : "a"}><p><Link className="link" to="/admin/users">Users</Link></p></div>
                <div className={props.class? "a" : "active a"}><p><Link className="link" to="/admin/projects">Projects</Link></p></div>
                <div className="a"></div>      
            </div>
            <div> 
                <div className="grid-search">
                <div className="a"></div> 
                    <input type="text" className="search-bar search" onKeyUp={(e)=>{searchInput(e)}} placeholder="Search.."/>
                    <button className="button addAdmin-butt add" onClick={togglePopup} disabled={isEmpty}>Delete</button>
                <div className="a"></div> 
                </div>
            </div>
            <div className="spaceForTable">
                {Display()}
            </div>
            {showPopup ? <Popup closePopup={togglePopup} delete={sendDeleteInfo} usersArray={UserNamesToBeDeleted} projectsArray={ProjectNamesToBeDeleted}/> : null}
        </div> 
    )
}