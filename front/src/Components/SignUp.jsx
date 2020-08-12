import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { useDispatch } from 'react-redux'
import {setToken} from '../Actions'

export default function SignUp(props){
    const [users, setUsers] =useState([])
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [tempPassword, setTempPassword] =useState()
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/users')
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled){
                setUsers(data)
            }})
        .catch(error=> console.error('Error: ', error)
        ) 

        return()=>{
            isCanclled = true
        }
    },[]);
    //----------------------------------------------------------
    // get name + check if valid length
    const handleName=(e)=>{
        if(e.target.value.length > 0){
            setName(e.target.value)
            document.getElementById("nameBlank").innerHTML="";
        }
        else{
            document.getElementById("nameBlank").innerHTML="name can't be blank";
        }
    }
    //----------------------------------------------------------
    // get email + check if valid by pattern
    const handleEmail=(e)=>{
        if(/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)){
            setEmail(e.target.value)
            document.getElementById("errorEmail").innerHTML=" ";
        }
        else{
            document.getElementById("errorEmail").innerHTML="invalid email adress";
        }
    }
    //----------------------------------------------------------
    // get phone number + check if valid by pattern
    const handlePhone=(e)=>{
        if((/^\d{7,}$/).test(e.target.value.replace(/[\s()+.-]|ext/gi, ''))){
            //strips all valid special characters which an international phone number can contain
            // (spaces, parens, +, -, ., ext) and then counts if there are at least 7 digits
            setPhone(e.target.value)
            document.getElementById("errorPhone").innerHTML="";
        }
        else{
            document.getElementById("errorPhone").innerHTML="invalid phone number";
        }
    }
    //----------------------------------------------------------
    // get password + check if valid by length and pattern 
    const handlePass=(e)=>{
        if(e.target.value.length >= 8){
            if (e.target.value.match(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)){
                setTempPassword(e.target.value)
                document.getElementById("errorPass").innerHTML=" ";
            }
        }
        else{
            document.getElementById("errorPass").innerHTML="password length minimum 8 chars, including letters and numbers";
        }
    }
    //----------------------------------------------------------
    // check if passwords match
    const handleMatchPass=(e)=>{
        if(e.target.value === tempPassword){
                setPassword(e.target.value)
                document.getElementById("errorPass2").innerHTML="";    
        }
        else{
            document.getElementById("errorPass2").innerHTML="passwords don't match";
        }
    }
    //----------------------------------------------------------
    // check if all inputs filled and sends post request to server
    const signed=(e)=>{
        // submit action changes the url - we prevent it with e.preventDefault()
        e.preventDefault()
        setIsLoading(true)
        if (name && email && password){
            let UserIndex = users.findIndex(user => user.email === email)
            if(UserIndex===-1){ 
                   
                let singleUser = {
                    name:name,
                    password:password,
                    email:email, phone:phone
                }
                
                const url = 'http://localhost:9000/users';
                const options = {
                    method: 'POST',
                    body: JSON.stringify(singleUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())

                setTimeout(() => {
                    props.reRender()

                    fetch('http://localhost:9000/users')
                    .then(response=> response.json())
                    .then(data=> {
                        // find index for user and storage in localstorage 
                        let index = data.findIndex(user => user.email === email)
                        let userID = data[index].id
                        if(userID!==-1){
                            localStorage.setItem('UserId', userID)
                            localStorage.setItem('UserName', name)
                            localStorage.setItem('UserIndex', index)
                            let passwordData = {
                                passwordBody:password,
                                emailBody:email,
                                id:userID
                            }
                            // create token by user id
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
                                if(data[index].email===email && hashedPassword){                       
                                    dispatch(setToken(email, hashedPassword, userID))
                                    history.push(`/timetracker/user=${userID}`)
                                }                        
                            }
                        }
                        else{
                            console.error('Something went wrong...')
                        }})
                    .catch(error=> console.error('Error: ', error))
                }, 2000);
            }
            else{
                document.getElementById("errorEmail").innerHTML="Email already exists"; 
            }
        }
    }
    //----------------------------------------------------------
    return(
        <div className="main">
            <h1>Sign up</h1>
            {isLoading? <LoadingSpinner/> : <form onSubmit={signed}>
                <div>
                <span>*</span>
                    <input className="inputArea" type="text" name="name" placeholder="Name"
                        onChange={handleName} required/>
                    <p id="nameBlank"></p>
                </div>
                <div>
                <span>*</span>
                    <input className="inputArea" type="email" name="email" placeholder="Email"
                        onChange={handleEmail} required/>
                    <p id='errorEmail'></p>
                </div>
                <div>
                    <input className="inputArea" type="text" name="phone" placeholder="Phone Number"
                        onChange={handlePhone}/>
                    <p id='errorPhone'></p>
                </div>
                <div>
                <span>*</span>
                    <input className="inputArea" type="password" name="password1" placeholder="Password"
                        onChange={handlePass} required/>
                    <p id='errorPass'></p>
                </div>
                <div>
                <span>*</span>
                    <input className="inputArea" type="password" name="password2" placeholder="Configure Password"
                        onChange={handleMatchPass} required/>
                    <p id='errorPass2'></p>
                </div>
                <button type="submit" className="submit">Submit</button>
            </form>}
        </div>
    )
}