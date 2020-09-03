import React,{useState} from 'react'

export default function AddUserComp(props){

    const [phone, setPhone] = useState(true)
    const [UserName, setUserName] = useState()
    const [UserEmail, setUserEmail] = useState()
    const [UserPassword, setUserPassword] = useState()
    
    //----------------------------------------------------------
    // check if the admin contains all the right info
    const addUser=()=>{
        let emailIndex = props.users.findIndex(user => user.email === UserEmail)
        // check if the phone valid by pattern
        if(phone.length>0){
            if(!phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)){
                //strips all valid special characters which an international phone number can contain
                // (spaces, parens, +, -, ., ext) and then counts if there are at least 7 digits
                setPhone(false)
            }
        }
        if((/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(UserEmail))&&emailIndex===-1){
            if(phone===true || phone.length>=7){
                if(UserPassword.length >= 8 && UserPassword.match(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)){
                    if(UserName!==""){
                        if(phone===true){
                            props.newUser(UserName, UserPassword, UserEmail) 
                        }
                        else{
                        props.newUser(UserName, UserPassword, UserEmail, phone)
                        }
                    }
                }
                else{
                    alert("password length minimum 8 chars, including letters and numbers");
                }                
            }
            else{
                alert("invalid phone number")
            }
        }
        else{
            alert("Invalid email adress")
        }
    }
    //----------------------------------------------------------
    return (
        <div className="sign_grid">
            <div className="sign_input1">
            <input required className="inputTime" type="text" placeholder="Name"
                onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
            <div className="sign_input2">
            <input className="inputTime" type="text" placeholder="Phone NO."
                onChange={(e)=>{setPhone(e.target.value)}}/>
            </div>
            <div className="sign_input3">
                <input required className="inputTime" type="text" placeholder="Email"
                onChange={(e)=>{setUserEmail(e.target.value)}}/>
            </div>
            <div className="sign_input4"> 
                <input required className="inputTime" type="text" placeholder="Password"
                onChange={(e)=>{setUserPassword(e.target.value)}}/>
            </div>
            <div className="addnew">
                <button className="add-butt addnew" onClick={addUser}>Add New User</button>
            </div>
        </div>
    )
}