import React,{useState} from 'react'
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';

export default function ContentAdmins(props) {
    const [adminName, setAdminName] = useState("")
    const [company, setCompany] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [adminPassword, setAdminPassword] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    
    const admins = props.adminsDB
    //----------------------------------------------------------
    //checkValidEmail & checkValidPassword both check for a specific pattern
    const checkValidEmail=(e)=>{
        setAdminEmail(e.target.value)
        let AdminEmailIndex = admins.findIndex(admin => admin.AdminEmail === e.target.value)
        if(AdminEmailIndex===-1){
            if(/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e.target.value)){
                setIsEmailValid(true)
            } //this if checks for pattern while the email cannpt be found in the users DB
            else{
                setIsEmailValid(false)
            }
        } //this if checks only if the email in the input is not found in the users DB
        else{
            if(AdminEmailIndex!==-1){
                alert('Sorry it seems this Email is already registered\nPlease pick another one')
            }
        }
    }
    const checkValidPassword=(e)=>{
        setAdminPassword(e.target.value)
        if (!(/[a-zA-Z0-9]{16,}$/.test(e.target.value))) {
            setIsPasswordValid(true)
        }
        else{
            setIsPasswordValid(false)
        }
    }
    //----------------------------------------------------------
    // manipulates the hidden area
    const toggle=()=>{
        setIsOpen(!isOpen)
    }
    //----------------------------------------------------------
    const checkUpdates=()=>{
        //update admins name
        if(adminName!==""){
                let singleAdmin = {
                    id:props.admin.adminID,
                    name:adminName
                }

                const url = 'http://localhost:9000/admin/name';
                const options = {
                    method: 'PUT',
                    body: JSON.stringify(singleAdmin),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch(url, options)
                .then(res => res.json())
                .catch(error=> console.error('Error: ', error))
        }
        //update admins password
        if(isPasswordValid===true){
            let singleAdmin = {
                id:props.admin.adminID,
                password:adminPassword
            }

            const url = 'http://localhost:9000/admin/password';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleAdmin),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        //update admins company
        if(company!==""){
            let singleAdmin = {
                adminID:props.admin.adminID,
                company:company
            }

            const url = 'http://localhost:9000/admin/company';
            const options = {
                method: 'PUT',
                body: JSON.stringify(singleAdmin),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
            .then(res => res.json())
            .catch(error=> console.error('Error: ', error))
        }
        props.reRender()
        setIsOpen(!isOpen)
    }
    //----------------------------------------------------------
    // sending the id of the project when checkbox is marked
    const sendInfo=()=>{
        props.update(props.admin.adminID,props.admin.adminName)
    }
    //----------------------------------------------------------
    
    return (
        <div className="area"> 
            <div className="grid-checkAndInfo">
                <div className="b"></div>
                <input className="checkbox del" type="checkbox" onChange={sendInfo}/>
                {isOpen? <div className="border-simple grid-userInfo">
                    <GoTriangleUp className="color-zan cursor" onClick={toggle}/>
                        <input className="username inputTime" type="text" placeholder={props.admin.adminName} onChange={(e)=>{setAdminName(e.target.value)}}/>
                        <input disabled className="usermail inputTimeDis" type="text" placeholder={props.admin.adminEmail} onChange={(e)=>{checkValidEmail(e)}}/>
                        <div className="pass"><p>Password: </p><input className="inputTime" type="text" placeholder="********" onChange={(e)=>{checkValidPassword(e)}}/></div>
                        <div className="phone"><p>Company: </p><input className="inputTime" type="text" placeholder={props.admin.company} onChange={(e)=>{setCompany(e.target.value)}}/></div>
                    <div className="grid-userInfoLast">
                        <div className="id"></div>
                        <div className="status"></div>
                        <button className="addButt addAdmin-butt" onClick={checkUpdates}>Update Info</button>
                    </div>
                </div> : 
                <div className="border-simple grid-info-small">
                    <GoTriangleDown className="color-zan cursor arrow" onClick={toggle}/>
                    <label className="name">{props.admin.adminName}</label>
                    <label className="email">{props.admin.company}</label>
                </div>}
            </div>
        </div>
    )
}