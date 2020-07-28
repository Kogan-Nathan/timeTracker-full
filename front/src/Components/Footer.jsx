import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <nav className="footer">
            <ul className="list">
                <Link style={{color:'#ffffff'}} to="/about"><li> About </li></Link>
                <Link style={{color:'#ffffff'}} to="/privacy-policy"><li> Privacy policy </li></Link>
                <Link style={{color:'#ffffff'}} to="/contact-us"><li> Contact us </li></Link>
            </ul>
        </nav>
    )
}