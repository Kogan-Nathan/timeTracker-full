import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { isLoggedOut } from '../Actions';


export default function Header(props) {
    const IsLoggedInfo = useSelector(state=>state.isLogged)
    const users = useSelector(state=>state.Users)
    const admin = useSelector(state=>state.Admin)
    const dispatch = useDispatch();

    //----------------------------------------------------------
    const logout=()=>{
        dispatch(isLoggedOut())
    }
    //----------------------------------------------------------
    const getName=()=>{
        if (props.userName){
            return props.userName
        }
        else{
            return "admin"
        }
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
                        <Link to="/signup" className="signup-butt background-color">Sign up</Link>
                    </div>}
                </div>
            </div>
    )
}