import React,{useState} from 'react'
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';
import moment from 'moment'

export default function UserArea(props) {
    const [UsersName, setUsersName] = useState("")
    const [UsersPhone, setUsersPhone] = useState("")
    const [isPhoneValid, setIsPhoneValid] = useState(false)
    const [UsersEmail, setUsersEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [UsersPassword, setUsersPassword] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    
    const users = props.usersDB
    //----------------------------------------------------------
    //checkValidEmail & checkValidPassword both check for a specific pattern
    const checkValidEmail=(e)=>{
        setUsersEmail(e.target.value)
        let UserEmailIndex = users.findIndex(user => user.email === e.target.value)
        if(UserEmailIndex===-1){
            if(/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)){
                setIsEmailValid(true)
            } //this if checks for pattern while the email cannpt be found in the users DB
            else{
                setIsEmailValid(false)
            }
        } //this if checks only if the email in the input is not found in the users DB
        else{
            if(UserEmailIndex!==-1){
                alert('Sorry it seems this Email is already registered\nPlease pick another one')
            }
        }
    }
    const checkValidPassword=(e)=>{
        setUsersPassword(e.target.value)
        if (!(/[a-zA-Z0-9]{16,}$/.test(e.target.value))) {
            setIsPasswordValid(true)
        }
        else{
            setIsPasswordValid(false)
        }
    }
    //----------------------------------------------------------
    // get phone number + check if valid by pattern
    const checkValidPhone =(e)=>{
        setUsersPhone(e.target.value)
        if ((/^\d{7,}$/).test(e.target.value.replace(/[\s()+.-]|ext/gi, ''))) {
            //strips all valid special characters which an international phone number can contain
            // (spaces, parens, +, -, ., ext) and then counts if there are at least 7 digits
            setIsPhoneValid(true)
        }
        else{
            setIsPhoneValid(false)
        }
    }
    //----------------------------------------------------------
    // manipulates the hidden area
    const toggle=()=>{
        setIsOpen(!isOpen)
    }
    //----------------------------------------------------------
    const checkUpdates=()=>{
        //update user name
        if(UsersName!==""){
                let singleUser = {
                    id:props.user.id,
                    name:UsersName
                }

                const url = 'http://localhost:9000/users/name';
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(singleUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())
                .catch(error=> console.error('Error: ', error))
        }
        //update user email
        if(isEmailValid===true){
            let singleUser = {
                id:props.user.id,
                email:UsersEmail
            }

            const url = 'http://localhost:9000/users/email';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        //update user password
        if(isPasswordValid===true){
            let singleUser = {
                id:props.user.id,
                password:UsersPassword
            }

            const url = 'http://localhost:9000/users/password';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        //update user phone
        if(isPhoneValid===true){
            let singleUser = {
                id:props.user.id,
                phone:UsersPhone
            }

            const url = 'http://localhost:9000/users/phone';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        props.dataRender()
        setIsOpen(!isOpen)
    }
    //----------------------------------------------------------
    //this function converts to "00:00" format
    const convertStatusTime=()=>{
        let userStatus = props.user.status
        let totalTime = moment.duration(userStatus, 'hours');
        let hours = Math.floor(totalTime.asHours());
        let mins  = Math.floor(totalTime.asMinutes()) - hours * 60;
        hours = ((hours > 9) ? hours : ("0"+hours))
        mins = ((mins > 9) ? mins : ("0"+mins))
        let result = hours + ":" + mins;
        return result
    }
    //----------------------------------------------------------
    // sending the id of the project when checkbox is marked
    const sendInfo=()=>{
        props.update(props.user.id,props.user.name)
        props.dataRender()
        // render page to update visual information "on-time"
    }
    //----------------------------------------------------------
    
    return (
        <div className="area"> 
            <div className="grid-checkAndInfo">
                <div className="b"></div>
                <input className="checkbox del" type="checkbox" onChange={sendInfo}/>
                {isOpen? <div className="border-simple grid-userInfo">
                    <GoTriangleUp className="color-zan cursor" onClick={toggle}/>
                        <input className="username inputTime" type="text" placeholder={props.user.name} onChange={(e)=>{setUsersName(e.target.value)}}/>
                        <input disabled className="usermail inputTimeDis" type="text" placeholder={props.user.email} onChange={(e)=>{checkValidEmail(e)}}/>
                        <div className="pass"><p>Password: </p><input className="inputTime" type="text" placeholder="********" onChange={(e)=>{checkValidPassword(e)}}/></div>
                        <div className="phone"><p>Phone: </p><input className="inputTime" type="text" placeholder={props.user.phone} onChange={(e)=>{checkValidPhone(e)}}/></div>
                    <div className="grid-userInfoLast">
                        <span className="id">Worker ID:  {props.user.id}</span>
                        <span className="status">Status: {convertStatusTime()} hrs</span>
                        <button className="addButt addAdmin-butt" onClick={checkUpdates}>Update Info</button>
                    </div>
                </div> : 
                <div className="border-simple grid-info-small">
                    <GoTriangleDown className="color-zan cursor arrow" onClick={toggle}/>
                    <label className="name">{props.user.name}</label>
                    <label className="email">{props.user.email}</label>
                </div>}
            </div>
        </div>
    )
}