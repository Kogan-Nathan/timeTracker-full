import React from 'react'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

export default function RowReport(props) {
    return (
        <div>
            <Table className={props.isAdmin ? "" : "tableProjects"}>
                <thead className="noBorder">
                    <tr>
                        <td className="reportTd" placeholder="Project Name"> {props.report.ProjectName} </td>
                        <td className="reportTd" placeholder="From">{props.report.From}</td>
                        <td className="reportTd" placeholder="To">{props.report.To}</td>
                        <td className="reportTd" placeholder="report date"> {moment(props.report.Date).format("DD-MM-YY")} </td>
                        <td className="reportTd" placeholder="report status">{props.report.Status}</td>
                    </tr>
                </thead>    
            </Table>
        </div>
    )
}