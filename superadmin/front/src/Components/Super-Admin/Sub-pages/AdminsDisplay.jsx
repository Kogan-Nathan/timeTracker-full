import React,{useState, useEffect} from 'react'
import SearchBar from '../../General-Components&Pages/SearchBar'
import AddAdminComp from '../AddAdminComp'
import ContentAdmin from '../Mapping/ContentAdmin'
import Popup from '../../General-Components&Pages/Popup'
// import {Link} from 'react-router-dom'

export default function AdminsDisplay() {
    const [admins, setAdmins] = useState([])
    const [AdminsToBeDeleted, setAdminsToBeDeleted] = useState([])
    const [AdminNamesToBeDeleted, setAdminNamesToBeDeleted] = useState([])
    const [pageRender, setPageRender] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [searchBar, setSearchBar] = useState("")
    const [searchArray, setSearchArray] = useState([])

    useEffect(()=>{
        setTimeout(() => {
         fetch('http://localhost:9000/adminInfo')
        .then(response=> response.json())
        .then(data=> setAdmins(data))
        .catch(error=> console.error('Error: ', error))
        }, 200);

    },[pageRender]);
    //----------------------------------------------------------
    const renderDB=()=>{
        setPageRender(!pageRender)
    }
    //----------------------------------------------------------
    const togglePopup=()=>{
        setShowPopup(!showPopup)
    }
    //---------------------------------------------------------- 
    const updateSearchBar=(value)=>{
        setSearchBar(value)
    }
    //---------------------------------------------------------- 
    const updateSearchArray=(value)=>{
        setSearchArray(value)
    }
    //---------------------------------------------------------- 
    // delete button dependency is isEmpty
    useEffect(()=>{
        if(AdminsToBeDeleted.length>0){
            setIsEmpty(false)
        }
        else{
            setIsEmpty(true)
        }
    },[AdminsToBeDeleted])
    //----------------------------------------------------------
    function UpdateAdminsToBeDeleted(AdminID, AdminName){
        if(AdminsToBeDeleted.length===0){
            setAdminsToBeDeleted(AdminsToBeDeleted.concat(AdminID))
            setAdminNamesToBeDeleted(AdminNamesToBeDeleted.concat(AdminName))
        }
        else{
            let Index = AdminsToBeDeleted.findIndex(value => value===AdminID)        
            if(Index!==-1){
                let tempID = AdminsToBeDeleted.filter(value=> value!==AdminID);
                let tempName = AdminNamesToBeDeleted.filter(value=> value!==AdminName);
                setAdminsToBeDeleted(tempID,...AdminsToBeDeleted)                            
                setAdminNamesToBeDeleted(tempName,...AdminNamesToBeDeleted)                            
            }
            if(Index===-1){
                setAdminsToBeDeleted(AdminsToBeDeleted.concat(AdminID))
                setAdminNamesToBeDeleted(AdminNamesToBeDeleted.concat(AdminName))
            }
        }
    }
    //----------------------------------------------------------
    const deleteAdmins=()=>{
        togglePopup()
        const url = 'http://localhost:9000/admins';
        const options = {
            method: 'DELETE',
            body: JSON.stringify(AdminsToBeDeleted),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(setAdminNamesToBeDeleted([]))
        .then(setAdminsToBeDeleted([]))
        .catch(error=> console.error('Error: ', error))          

        renderDB()
    }
    //----------------------------------------------------------
    const AddNewAdmin=(AdminName, AdminPassword, AdminEmail, CompanyName)=>{
        let singleAdmin = {
            name:AdminName,
            password:AdminPassword,
            email:AdminEmail,
            company:CompanyName
        }

        const url = 'http://localhost:9000/admins';
        const options = {
            method: 'POST',
            body: JSON.stringify(singleAdmin),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .catch(error=> console.error('Error: ', error)) 
        // does not render on adding a new admin
        renderDB()
    }
    //----------------------------------------------------------
    const sortAdmins=(searchFrom)=>{
        let temp = searchFrom.sort((a,b)=> {
            let lowerCaseA = a.adminName.toLowerCase()
            let lowerCaseB = b.adminName.toLowerCase()
            if (lowerCaseA < lowerCaseB) return -1;
            else if (lowerCaseA > lowerCaseB) return 1;
            return 0;
        })
        return temp
    }
    //----------------------------------------------------------
     const display=()=>{
        if(searchBar!==""){
        let sortedAdminsArray = sortAdmins(searchArray)
        return(
            <div className="scroll">
                {sortedAdminsArray.map(admin => {return <ContentAdmin adminsDB={admins} admin={admin} key={admin.adminID} update={UpdateAdminsToBeDeleted} reRender={renderDB}/>})}
            </div>
        )
        }
        else{
            let sortedAdminsArray = sortAdmins(admins)
            return(
                <div className="scroll">
                    {sortedAdminsArray.map(admin=> {return <ContentAdmin adminsDB={admins} admin={admin} key={admin.adminID} update={UpdateAdminsToBeDeleted} reRender={renderDB}/>})}
                </div>
            )   
        }
    }
    //----------------------------------------------------------
    
    return (
        <div className="container">
            <h3 className="h-spesific"> Admins </h3>
            <SearchBar DeletePopup={togglePopup} Admins={admins} SearchValue={updateSearchBar} SearchArray={updateSearchArray} Empty={isEmpty}/>
            <AddAdminComp AllAdmins={admins} reRender={renderDB} newAdmin={AddNewAdmin}/>
            {display()}
            {showPopup ? <Popup closePopup={togglePopup} delete={deleteAdmins} usersArray={AdminNamesToBeDeleted} projectsArray={AdminNamesToBeDeleted}/> : null}
        </div>
    )
}