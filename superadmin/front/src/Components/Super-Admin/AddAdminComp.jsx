import React,{useState} from 'react'

export default function AddProjectComp(props){

    const [CompanyName, setCompanyName] = useState()
    const [AdminName, setAdminName] = useState()
    const [AdminEmail, setAdminEmail] = useState()
    const [AdminPassword, setAdminPassword] = useState()
    
    //----------------------------------------------------------
    // check if the admin contains all the right info
    const addAdmin=(e)=>{
        e.preventDefault()
        let companyIndex = props.AllAdmins.findIndex(admin => admin.company === CompanyName)
        let emailIndex = props.AllAdmins.findIndex(admin => admin.email === AdminEmail)
        if(companyIndex===-1){
            if((/[a-zA-Z0-9._!@#$%^&*()-+]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(AdminEmail))&&emailIndex===-1){
                if(AdminPassword.length >= 8 && AdminPassword.match(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)){
                    if(AdminName!==""){
                        props.newAdmin(AdminName, AdminPassword, AdminEmail, CompanyName)
                    }
                }
                else{
                    alert("password length minimum 8 chars, including letters and numbers");
                }                
            }
            else{
                alert("Invalid email adress")
            }
        }
        else{
            alert("the company already exists")
        }
    }
    //----------------------------------------------------------

    return (
        <form onSubmit={addAdmin} className="sign_grid">
            <div className="sign_input1">
            <input required className="inputTime" type="text" placeholder="Name"
                onChange={(e)=>{setAdminName(e.target.value)}}/>
            </div>
            <div className="sign_input2">
            <input required className="inputTime" type="text" placeholder="Company Name"
                onChange={(e)=>{setCompanyName(e.target.value)}}/>
            </div>
            <div className="sign_input3">
                <input required className="inputTime" type="text" placeholder="Email"
                onChange={(e)=>{setAdminEmail(e.target.value)}}/>
            </div>
            <div className="sign_input4"> 
                <input required className="inputTime" type="text" placeholder="Password"
                onChange={(e)=>{setAdminPassword(e.target.value)}}/>
            </div>
            <div className="addnew">
                <button className="add-butt addnew" type="submit">Add New Admin</button>
            </div>
        </form>
    )
}