import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ContentProject from './ContentProject'
import ContentUser from './ContentUser'
import { GoTriangleRight } from 'react-icons/go';
import { FaDollarSign } from 'react-icons/fa';
import moment from 'moment' 

export default function AdminPage(props) {
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [ProjectsToBeDeleted, setProjectsToBeDeleted] = useState([])
    const [UsersToBeDeleted, setUsersToBeDeleted] = useState([])
    const [TemporaryArray, setTemporaryArray] = useState([])
    const [SearchBar, setSearchBar] = useState("")
    const [ProjectManager, setProjectManager] = useState()
    const [ProjectClient, setProjectClient] = useState()
    const [ProjectName, setProjectsName] = useState()
    const [ProjectCost, setProjectCost] = useState(false)
    const [dbRender, setDbRender] = useState(false)

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
    // delete projects   
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
                return lowerCaseName.includes(e.target.value);
            })
            setTemporaryArray(tempArray)
        }
        if(props.displayPage==="Projects"){
            const tempArray = projects.filter(value => {
            let lowerCaseName = value.projectName.toLowerCase();
                return lowerCaseName.includes(e.target.value);
            })
            setTemporaryArray(tempArray)
        }
        setSearchBar(e.target.value)
    }
    //----------------------------------------------------------
    // send the info to be delete from database 
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
                return((TemporaryArray.map(value=>{
                    return <ContentUser key={value.id} dataRender={renderPage} user={value}
                    update={UpdateUsersToBeDeleted}  usersDB={users}/>
                })))   
            } //if the search isnt empty it is showing the search result
            // and if it is empty it is showing the original users DB
            else{
                return((users.map(value=>{
                    return <ContentUser key={value.id} dataRender={renderPage} user={value}
                    update={UpdateUsersToBeDeleted} usersDB={users}/>
                })))                
            }
        }
        else if(props.displayPage==="Projects"){
            //if the search isnt empty it is showing the search result
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
                        {TemporaryArray.map(value=>{
                            return <ContentProject key={value.projectID} dataRender={renderPage} project={value}
                            update={UpdateProjectsToBeDeleted} projectsDB={projects}/>
                            })}
                    </div>
                )
            } 
            // if the search input is empty it is showing the original users DB
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
                        {projects.map(value=>{
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