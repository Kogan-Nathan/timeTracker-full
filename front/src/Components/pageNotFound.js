import React from 'react'
import {useHistory} from 'react-router-dom'

export default function PageNotFound(){
    const history = useHistory();
 
    return(
        <div className="container">
                <div className="notfound"> 
                    <h2>404 - Page not found</h2>
                    <p>The page you are looking for might have been removed,</p>
                    <p>had its name changed or is temporarily unavailable.</p>
                    <button className="butt-404" onClick={()=>{history.goBack()}}> Go back </button>
                </div>
        </div>
    )
}