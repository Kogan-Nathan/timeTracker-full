import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import UserArea from './UserArea'
import ProjectArea from './ProjectArea'
import {Link} from 'react-router-dom'
import { GoTriangleRight } from 'react-icons/go';
import { FaDollarSign } from 'react-icons/fa';
import moment from 'moment' 
import { addNewProject, adminNewProject, deleteProjects, adminDeleteProjects, adminDeleteUsers } from '../Actions';


export default function AdminPage(props) {
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [UsersToBeDeleted, setUsersToBeDeleted] = useState([])
    const [ProjectsToBeDeleted, setProjectsToBeDeleted] = useState([])
    const [TemporaryArray, setTemporaryArray] = useState([])
    const [SearchBar, setSearchBar] = useState("")
    const [dbRender, setDbRender] = useState(false)

    const [ProjectName, setProjectsName] = useState()
    const [ProjectClient, setProjectClient] = useState()
    const [ProjectManager, setProjectManager] = useState()
    const [ProjectCost, setProjectCost] = useState(false)

    const dispatch = useDispatch();
    // const users = useSelector(state=>state.Users)

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
    function postProject(){
        let singleProject = {name:ProjectName, client:ProjectClient, status: '21:20', manager:ProjectManager, date:moment().format("YYYY-MM-DD"), cost:ProjectCost}
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
        .catch(error=> console.error('Error: ', error))
    }
    //----------------------------------------------------------    
    function UpdateUsersToBeDeleted(UsersID){
        if(UsersToBeDeleted.length===0){
            setUsersToBeDeleted(UsersToBeDeleted.concat(UsersID))
        }
        else{
            let Index = UsersToBeDeleted.findIndex(value => value===UsersID)            
            if(Index!==-1){
                let temp = UsersToBeDeleted.filter(value=> value!==UsersID);
                setUsersToBeDeleted(temp,...UsersToBeDeleted)                    
            }
            if(Index===-1){
                setUsersToBeDeleted(UsersToBeDeleted.concat(UsersID))
            }
        }
    }
    //----------------------------------------------------------    
    function UpdateProjectsToBeDeleted(ProjectName){
        if(ProjectsToBeDeleted.length===0){
            setProjectsToBeDeleted(ProjectsToBeDeleted.concat(ProjectName))
        }
        else{
            let Index = ProjectsToBeDeleted.findIndex(value => value===ProjectName)            
            if(Index!==-1){
                let temp = ProjectsToBeDeleted.filter(value=> value!==ProjectName);
                setProjectsToBeDeleted(temp,...ProjectsToBeDeleted)                    
            }
            if(Index===-1){
                setProjectsToBeDeleted(ProjectsToBeDeleted.concat(ProjectName))
            }
        }
    }
    //----------------------------------------------------------
    const searchInput=(e)=>{
        //onKeyUp search updates a temporary array that is displayed through map 
        if(props.displayPage==="Users"){
            const tempArray = users.filter(value => {
                let lowerCaseName = value.name.toLowerCase();
                 return lowerCaseName.includes(e.target.value);})
                     setTemporaryArray(tempArray)
                    }
        if(props.displayPage==="Projects"){
            const tempArray = projects.filter(value => {
                let lowerCaseName = value.projectName.toLowerCase();
                 return lowerCaseName.includes(e.target.value);})
                     setTemporaryArray(tempArray)
        }
        setSearchBar(e.target.value)
    }
    //----------------------------------------------------------
    const sendDeleteInfo=()=>{        
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
            // dispatch(adminDeleteUsers(UsersToBeDeleted))
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
            // dispatch(deleteProjects(ProjectsToBeDeleted))
            // dispatch(adminDeleteProjects(ProjectsToBeDeleted))
        }
    }
    //----------------------------------------------------------
    const checkUpdates=()=>{
        if(projects.length===0){
            if(ProjectName!==undefined){
                if(ProjectClient!==undefined){
                    if(ProjectManager!==undefined){
                        postProject()
                        // dispatch(addNewProject(ProjectName, ProjectClient, ProjectManager, moment().format("YYYY-MM-DD"), ProjectCost))
                    }
                    else{
                        alert("Sorry, Project must contain Project Manager")
                    }
                }
                else{
                    alert("Sorry, Project must contain Client")
                }
            }
            else{
                alert("Sorry, Project must contain Name")
            }
        }
        else{
            let projectIndex = projects.findIndex(value=> value.projectName === ProjectName)
            if(projectIndex===-1){
                if(ProjectName===undefined){
                    alert("Sorry, Project must contain Name")
                }
                else{
                    if(ProjectClient!==undefined){
                        if(ProjectManager!==undefined){
                            postProject()
                            // dispatch(addNewProject(ProjectName, ProjectClient, ProjectManager, moment().format("YYYY-MM-DD"), ProjectCost))
                        }
                        else{
                            alert("Sorry, Project must contain Project Manager")
                        }
                    }
                    else{
                        alert("Sorry, Project must contain Client")
                    }
                }
            }
            else{
                alert("Sorry, this project name is alread in use")
            }
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
                return(
                    (TemporaryArray.map(value=>{return <UserArea key={value.id} dataRender={renderPage} user={value} update={UpdateUsersToBeDeleted}/>}))
                )   
            } //if the search isnt empty it is showing the search result
            // and if it is empty it is showing the original users DB
            else{
                return(
                    (users.map(value=>{return <UserArea key={value.id} dataRender={renderPage} user={value} update={UpdateUsersToBeDeleted}/>}))
                )                
            }
        }
        else if(props.displayPage==="Projects"){
            if(SearchBar!==""){
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
                        {TemporaryArray.map(value=>{return <ProjectArea key={value.projectID} dataRender={renderPage} project={value} update={UpdateProjectsToBeDeleted} projectsDB={projects}/>})}
                    </div>
                )
            } //if the search isnt empty it is showing the search result
            // and if it is empty it is showing the original users DB
            else{
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
                        {projects.map(value=>{return <ProjectArea key={value.projectID} dataRender={renderPage} project={value} update={UpdateProjectsToBeDeleted} projectsDB={projects}/>})}
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
                    <button className="button addAdmin-butt add" onClick={sendDeleteInfo}>Delete</button>
                <div className="a"></div> 
                </div>
            </div>
            <div className="spaceForTable">
                {Display()}
            </div>
        </div> 
    )
}