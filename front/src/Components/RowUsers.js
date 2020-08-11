import React from 'react'
import Table from 'react-bootstrap/Table'

export default function RowUsers (props) {
    return (
        <div>
            <Table className="tableProjects">
                <thead>
                    <tr>
                        <td> {props.user.name} </td>
                        <td>{props.user.email}</td>
                        <td>{props.user.phone}</td>
                    </tr>
                </thead> 
            </Table>
        </div>
    )
}
