import React from 'react'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

export default function RowReport(props) {
    return (
        <div>
            <Table className="tableProjects">
                <thead className="noBorder">
                    <tr>
                        <td className="reportTd" placeholder="Project Name"> {props.report.ProjectName} </td>
                        <td className="reportTd" placeholder="From">{props.report.From}</td>
                        <td className="reportTd" placeholder="To">{props.report.To}</td>
                        <td className="reportTd" placeholder="report date"> {moment(props.report.Date).format("YYYY-MM-DD")} </td>
                        <td className="reportTd" placeholder="report status">Total: {props.report.Status}</td>
                    </tr>
                </thead>    
            </Table>
        </div>
    )
}