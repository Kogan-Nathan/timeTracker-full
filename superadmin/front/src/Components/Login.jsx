import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { isLogged, adminIsLogged } from '../Actions';


export default function Login(){
    const token = localStorage.getItem('localToken')
    const [email, setEmail] = useState()
    const [UsersInfo, setUsersInfo] = useState([])
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [wrongEmailSpan, setWrongEmailSpan] = useState(false)
    const [password, setPassword] = useState()
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [wrongPasswordSpan, setWrongPasswordSpan] = useState(false)
    const AdminInfo = useSelector(state=>state.Admin)
    // const UsersInfo = useSelector(state=>state.Users)
    // const IsLoggedInfo = useSelector(state=>state.isLogged)
    const dispatch = useDispatch();
    const history = useHistory();
    const [dbRender, setDbRender] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:9000/users')
        .then(response=> response.json())
        .then(data=> setUsersInfo(data))
        .catch(error=> console.error('Error: ', error)
        ) 
    },[dbRender]);

    //----------------------------------------------------------
    //checkValidEmail & checkValidPassword both check for a specific pattern
    //once they match the pattern the span will dissapear
    const checkValidEmail=(e)=>{
        setEmail(e.target.value)
        if (!(/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value))) {
            setIsEmailValid(true)
        }
        else{
            setIsEmailValid(false)
        }
    }

    const checkValidPassword=(e)=>{
        setPassword(e.target.value)
        if (!(/[a-zA-Z0-9]{8,}$/.test(e.target.value))) {
            setIsPasswordValid(true)
        }
        else{
            setIsPasswordValid(false)
        }
    }
    //----------------------------------------------------------
    const validLogIn=()=>{
        // checks if email and password are found.
        // if false, displays span#"wrong-email" & span#"wrong-password"
        // if true, dispatches isLogged
        if(email==="timeAdmin@zangula.com"){
            if(AdminInfo.email===email&&AdminInfo.password===password){
                dispatch(adminIsLogged())
            }
            else{
                setWrongPasswordSpan(true)
            }
        }
        else {
            if(UsersInfo.length===0){
                alert('No matches found')
            }
            else{
                let UserIndex = UsersInfo.findIndex(user => user.email === email)
                if(UserIndex===-1){
                    setWrongEmailSpan(true)
                }
                else{   
                                 
                    let passwordData = {passwordBody:password, emailBody:email}
                    const url = 'http://localhost:9000/usershash';
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(passwordData),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                    fetch(url, options)
                    .then(res => res.json())
                    .then(res=> login(res.accsessToken))
                    .catch(error=> console.error('Error: ', error))
                    renderPage()

                    function login(hashedPassword) {
                        if(UsersInfo[UserIndex].email===email && hashedPassword){                       
                            setWrongPasswordSpan(false)
                            localStorage.setItem('localToken', hashedPassword)
                            history.push(`/timetracker/user=${UsersInfo[UserIndex].id}`)
                        }
                        else{
                            setWrongPasswordSpan(true)
                        }                        
                    }
                }
            }
        }
    }

    const renderPage=()=>{
        setDbRender(!dbRender)
    }
    //----------------------------------------------------------
    return(
        <div className="login-page main">
            <div className="">
                <h1>Log In</h1>
                <div>
                    <input className="inputArea" type="text" name="email" placeholder="Enter email" onChange={(e)=>{checkValidEmail(e)}}/><br/>
                    <span className={wrongEmailSpan? "" : "hidden-flag"} id="wrong-email">email is not correct</span><br/>
                    <span className={isEmailValid? "" : "hidden-flag"} id="valid-email" >email is not valid</span><br/>
                </div>
                <div>
                    <input className="inputArea" type="password" placeholder="Enter password" onChange={(e)=>{checkValidPassword(e)}}/><br/>
                    <span className={wrongPasswordSpan? "" :"hidden-flag"} id="wrong-password">password is not correct</span><br/>
                    <span className={isPasswordValid? "" : "hidden-flag"} id="valid-password">password is not valid</span><br/>
                </div>
                <div>
                    <button className="submit" onClick={validLogIn}>Submit</button><br/>
                    <div className="signup-new">new here? <Link to="/signup" className="signup-redirection">sign up</Link></div>
                </div>
            </div>
        </div>
    )
}