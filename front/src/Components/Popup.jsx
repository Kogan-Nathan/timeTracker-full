import React from 'react'

export default function Popup(props){
    const displayArrayToBeDeleted=()=>{
        if(props.projectsArray.length>0){
            let projectsToBeDeleted = props.projectsArray.map((project)=> {return<p>{project}</p>})
            return (projectsToBeDeleted)
        }
        else{
            let usersToBeDeleted = props.usersArray.map((user)=> {return<p>{user}</p>})
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