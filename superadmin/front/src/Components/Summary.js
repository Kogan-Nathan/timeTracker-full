import React from 'react'
import Nav from './Nav'

export default function Summary() {

    return (
        <div>
            <Nav/>
            <table className="tableProjects">
                <tr>
                    <input type="text" placeholder="Project Name"></input>
                    <input type="text" placeholder="Client"></input>
                    <input type="number" placeholder="Status"></input>
                    <input type="date" placeholder="dd/mm/yyyy"></input>
                </tr> 
            </table>
            <div>
                <button className="signup-butt"> Total: {} </button>
            </div>
        </div>
    )
}
