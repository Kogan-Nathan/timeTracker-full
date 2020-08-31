import React from 'react'

export default function SearchBar(props) {
    
    //----------------------------------------------------------
    const togglePopup=()=>{
        props.DeletePopup()
    }
    //----------------------------------------------------------
    const searchInput=(e)=>{
        //onKeyUp search updates a temporary array that is displayed through map 
        if(props.displayPage==="Users"||props.displayPage==="Reports By User"){
            let tempArray = props.Users.filter(value => {
            let lowerCaseName = value.name.toLowerCase();
                for (let index = 0; index < lowerCaseName.length; index++) {
                    if(lowerCaseName.indexOf(e.target.value)===0){
                        return true
                    }
                    else{
                        return false
                    }
                }
            })
            props.SearchArray(tempArray)
        }
        if(props.displayPage==="Projects"||props.displayPage==="Reports By Project"){
            let tempArray = props.Projects.filter(value => {
            let lowerCaseName = value.projectName.toLowerCase();
                for (let index = 0; index < lowerCaseName.length; index++) {
                    if(lowerCaseName.indexOf(e.target.value)===0){
                        return true
                    }
                    else{
                        return false
                    }
                }
            })
            props.SearchArray(tempArray)
        }
        props.SearchValue(e.target.value)
    }

    return (
        <div className="grid-search">
            <div className="a"></div> 
                <input type="text" className="search-bar search" onKeyUp={(e)=>{searchInput(e)}} placeholder="Search.."/>
                <button className="button addAdmin-butt add" onClick={togglePopup} disabled={props.Empty}>Delete</button>
            <div className="a"></div> 
        </div>
    )
}