import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {setToken} from '../Actions'

export default function Login(){
    const [email, setEmail] = useState()
    const [AdminInfo, setAdminInfo] = useState([])
    const [UsersInfo, setUsersInfo] = useState([])
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [wrongEmailSpan, setWrongEmailSpan] = useState(false)
    const [password, setPassword] = useState()
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [wrongPasswordSpan, setWrongPasswordSpan] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(()=>{
        let isCanclled = false;
        fetch('http://localhost:9000/users')
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled) {
            setUsersInfo(data)
            }})        
        .catch(error=> console.error('Error: ', error))

        fetch('http://localhost:9000/adminInfo')
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled) {
            setAdminInfo(data)
            }})        
        .catch(error=> console.error('Error: ', error)
        )
        return()=>{
            isCanclled = true;
        }
    },[]);
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
    // checks if email and password are found.
    // if false, displays span#"wrong-email" & span#"wrong-password"
    // if true, dispatches isLogged
    const validLogIn=(e)=>{
        e.preventDefault()
        if(AdminInfo[0].email===email){
            if(AdminInfo[0].password===password){
                localStorage.setItem('UserName', 'admin')
                dispatch(setToken(email, 'adminToken'))
                history.push('/admin')
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
                    localStorage.setItem('UserId', UsersInfo[UserIndex].id)
                    localStorage.setItem('UserName', UsersInfo[UserIndex].name)
                    localStorage.setItem('UserIndex', UserIndex)
                    let passwordData = {
                        passwordBody:password,
                        emailBody:email,
                        id:UsersInfo[UserIndex].id
                    }

                    const url = 'http://localhost:9000/usershash';
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(passwordData),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                    fetch(url, options)
                    .then(response=> response.json())
                    .then(response=> login(response.accsessToken))
                    .catch(error=> console.error('Error: ', error))

                    function login(hashedPassword) {
                        if(UsersInfo[UserIndex].email===email && hashedPassword){                       
                            setWrongPasswordSpan(false)
                            dispatch(setToken(email, hashedPassword, UsersInfo[UserIndex].id))
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

    //----------------------------------------------------------
    return(
        <div className="login-page loginSignup">
            <div className="">
                <h1>Log In</h1>
                <form onSubmit={validLogIn}>
                <div>
                    <span>*</span>
                    <input className="inputArea" type="text" name="email" placeholder="Enter email" onChange={(e)=>{checkValidEmail(e)}} required/><br/>
                    <span className={wrongEmailSpan? "" : "hidden-flag"} id="wrong-email">email is not correct</span><br/>
                    <span className={isEmailValid? "" : "hidden-flag"} id="valid-email" >email is not valid</span><br/>
                </div>
                <div>
                    <span>*</span>
                    <input className="inputArea" type="password" placeholder="Enter password" onChange={(e)=>{checkValidPassword(e)}} required/><br/>
                    <span className={wrongPasswordSpan? "" : "hidden-flag"} id="wrong-password">password is not correct</span><br/>
                    <span className={isPasswordValid? "" : "hidden-flag"} id="valid-password">password is not valid</span><br/>
                </div>
                <div>
                    <button className="submit" type="submit">Submit</button><br/>
                    <div className="signup-new">new here? <Link to="/signup" className="signup-redirection">sign up</Link></div>
                </div>
                </form>
            </div>
        </div>
    )
}