import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { isLoggedOut } from '../../Actions';
import {useHistory} from 'react-router-dom'

export default function Header(props){
    const IsLoggedInfo = useSelector(state=>state.isLogged)
    const dispatch = useDispatch();
    const history = useHistory();
    //----------------------------------------------------------
    // dispatch isLoggedOut clearing the information about the user that was logged in
    const logout=()=>{
        dispatch(isLoggedOut())
        localStorage.clear()
        history.push("/login")
    }
    //----------------------------------------------------------
    // setting the name in local storage 
    const getName=()=>{
        return (localStorage.getItem('UserName'))
    }
    //----------------------------------------------------------

    return (
        <div className="header">
            <Link to="/" className="logo"> TimeTracker </Link>
            <div className="buttons-area"> 
            {IsLoggedInfo? <div>
            <span className="welcome">Welcome, {getName()}</span>
                    <button className="logout-butt" onClick={logout}>Log out</button> 
                </div> : 
                <div>
                    <Link to="/login" className="login-butt">Login</Link>
                    {/* <Link to="/signup" className="signup-butt background-color">Sign up</Link> */}
                </div>}
            </div>
        </div>
    )
}