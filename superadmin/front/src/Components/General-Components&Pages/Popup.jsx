import React from 'react'

export default function Popup(props){

    const randomStringGenerator=()=>{
        // a key of map cannot be its index!
        return(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    }
    //----------------------------------------------------------    
    const displayArrayToBeDeleted=()=>{
        if(props.projectsArray.length>0){
            let projectsToBeDeleted = props.projectsArray.map( project => {return<p  key={randomStringGenerator}>{project}</p>})
            return (projectsToBeDeleted)
        }
        else{
            let usersToBeDeleted = props.usersArray.map( user => {return<p key={randomStringGenerator}>{user}</p>})
            return (usersToBeDeleted)
        }
    }
    //----------------------------------------------------------

    return (
        <div className="popup-container">
            <div className="popup">
                <h4>Are you sure you want to delete:</h4>
                {displayArrayToBeDeleted()}
                <div style={{marginTop:"50px"}}>
                    <button className="butt-404" onClick={props.delete}>Yes, I'm sure</button>
                    <button className="cancel" onClick={props.closePopup}>Cancel</button>
                </div>
            </div>
        </div>
    )
}