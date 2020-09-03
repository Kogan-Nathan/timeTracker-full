import React from 'react'
import './Style/General.css'

export default function LoadingSpinner(){
 
    return(
        <div className="container">
            <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 48 48">
                <circle cx="24" cy="4" r="4" fill="#8BF6F7"/>
                <circle cx="12.19" cy="7.86" r="3.7" fill="#8BF6F7"/>
                <circle cx="5.02" cy="17.68" r="3.4" fill="#ADF6F7"/>
                <circle cx="5.02" cy="30.32" r="3.1" fill="#ADF6F7"/>
                <circle cx="12.19" cy="40.14" r="2.8" fill="#CAF9FA"/>
                <circle cx="24" cy="44" r="2.5" fill="#CAF9FA"/>
                <circle cx="35.81" cy="40.14" r="2.2" fill="#E3FEFF"/>
                <circle cx="42.98" cy="30.32" r="1.9" fill="#E3FEFF"/>
                <circle cx="42.98" cy="17.68" r="1.6" fill="#FFFFFF"/>
                <circle cx="35.81" cy="7.86" r="1.3" fill="#FFFFFF"/>
            </svg>
        </div>
    )
}