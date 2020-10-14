import React from 'react'
import Table from 'react-bootstrap/Table'

export default function ProjectRow(props) {
    return (
        <div>
            <Table className="tableProjects">
                <thead>
                    <tr>
                        <td> {props.project.projectName} </td>
                        <td>{props.project.projectClient}</td>
                        <td>{props.project.projectStatus}</td>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}
