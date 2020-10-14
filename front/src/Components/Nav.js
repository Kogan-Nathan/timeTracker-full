import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom";


export default function Nav() {
    const token = localStorage.getItem('localToken')
    // const [users, setUsers] = useState([])
    let users = "";
    const [UserIndex, setUserIndex] = useState()
    const history = useHistory();
    const [dbRender, setDbRender] = useState(false)
    const [show, setShow] = useState(false)

    // useEffect(() => {
    //     (async function() {
    //         try {
    //             const response = await fetch(
    //                 'http://localhost:9000/users', {headers: {'auth-token' : `${token}`}}
    //             );
    //             const json = await response.json();
    //             users = json.data;
    //             setShow(true)
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     )
    //     (async function(){
    //         try {
    //             const response = await fetch('http://localhost:9000/getToken', {headers: {'auth-token' : `${token}`}})
    //             const json = await response.json()
    //             getIndex(json.data)
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     });
    // }, [dbRender]);
    
    useEffect(()=>{
        fetch('http://localhost:9000/users', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        // .then(data=> setUsers(data))
        .then( data=> users = data)
        .then ( data => setShow(!show))
        .catch(error=> console.error('Error: ', error)
        
        )
        
        fetch('http://localhost:9000/getToken', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> getIndex(data))
        .catch(error=> console.error('Error: ', error))
        
    },[dbRender]);

    function getIndex(id){
        if (users.length > 0){
            console.log(id)
            console.log(users);
        let index = users.findIndex(user=> user.email===id.userMail)
        setUserIndex(users[index].id)
        
        // renderPage()
        }
    }

    const changeLocation = (e) =>{
        if (e.target.value === "last 7 days"){
            history.push(`/last7days/user=${UserIndex}`) 
            // renderPage()
        }
        if (e.target.value === "this month"){
            history.push(`/thismonth/user=${UserIndex}`)
            // renderPage()              
        }
        if (e.target.value === "spesific time"){
            history.push(`/spesifictime/user=${UserIndex}`)
            // renderPage()              
        }
        renderPage()
    }

    const renderPage=()=>{
        setDbRender(!dbRender)
    }

    return (
        (show &&
        <div className="nav-bar_container">
            <ul className="navbar">       
                <Link className="nav-links" to={`/timetracker/user=${UserIndex}`}>TimeTracker</Link>
                <select className="select-box" onChange={(e)=>changeLocation(e)}>
                    <option className="select-items">Summary</option>
                    <option className="select-items" value="last 7 days">last 7 days</option>
                    <option className="select-items" value="this month">this month</option>
                    <option className="select-items" value="spesific time">spesific time</option>
                </select>
                <Link className="nav-links" to={`/project/user=${UserIndex}`}>Projects</Link>
                <Link className="nav-links" to={`/users/user=${UserIndex}`}>Users</Link>
            </ul>
        </div>
        )
    )
}