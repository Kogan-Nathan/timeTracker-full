import React,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';
import RowReportsTable from './Mapping/RowReportsTable';

export default function ReportsTableByProject(props) {
    
    const [reports, setReports] = useState([]);
    const [sortByDate, setSortByDate] = useState(true)
    const [sortByTotal, setSortByTotal] = useState(false)

    useEffect(()=>{
        const ProjectID = props.project
        let isCanclled = false
        fetch('http://localhost:9000/reportsByProject', {headers: {'project-id' : ProjectID}})
        .then(res => res.json())
        .then(res=>{
            if(!isCanclled){
                let sortedReportsArray = res.sort((a,b)=> {
                    let lowerCaseA = a.Date
                    let lowerCaseB = b.Date
                    if (lowerCaseA > lowerCaseB) return -1;
                    else if (lowerCaseA < lowerCaseB) return 1;
                    return 0;
                })
            setReports(sortedReportsArray)
            }})
        .catch(error=> console.error('Error: ', error)) 
        return()=>{
            isCanclled = true
        }
    },[]);

    const handletotal =()=>{
        if(!sortByTotal){
            let sortedReportsArray = reports.sort((a,b)=> {
            let lowerCaseA = a.Status
            let lowerCaseB = b.Status
            if (lowerCaseA > lowerCaseB) return -1;
            else if (lowerCaseA < lowerCaseB) return 1;
            return 0;
            })
        setReports(sortedReportsArray)
        setSortByDate(false)
        }
        else{
            let sortedReportsArray = reports.sort((a,b)=> {
                let lowerCaseA = a.Status
                let lowerCaseB = b.Status
                if (lowerCaseA < lowerCaseB) return -1;
                else if (lowerCaseA > lowerCaseB) return 1;
                return 0;
            })
        setReports(sortedReportsArray) 
        setSortByDate(false)
        }
    }

    const handleDate=()=>{
        if(!sortByDate){
            let sortedReportsArray = reports.sort((a,b)=> {
            let lowerCaseA = a.Date
            let lowerCaseB = b.Date
            if (lowerCaseA > lowerCaseB) return -1;
            else if (lowerCaseA < lowerCaseB) return 1;
            return 0;
            })
        setReports(sortedReportsArray)
        setSortByTotal(false)
        }
        else{
            let sortedReportsArray = reports.sort((a,b)=> {
                let lowerCaseA = a.Date
                let lowerCaseB = b.Date
                if (lowerCaseA < lowerCaseB) return -1;
                else if (lowerCaseA > lowerCaseB) return 1;
                return 0;
            })
        setReports(sortedReportsArray)
        setSortByTotal(false)
        }
    }

    const handleDateSort=()=>{
        if(!sortByDate){
        setSortByDate(true)
        }
        else{
        setSortByDate(false)
        }
        handleDate()
    }

    const handleTotalSort=()=>{
        if(!sortByTotal){
        setSortByTotal(true)
        }
        else{
        setSortByTotal(false)  
        }
        handletotal()
    }

    return (
        <div className="reportArea">
            <div className="">
                {reports.length>0 ? <div>
                    <Table className="tableProjectsHeading">
                        <thead>
                            <tr className="adminHeading">
                                <th className="adminHeading-content">
                                    <p className="adminHeading-p">
                                        Project 
                                    </p>
                                </th>

                                <th> Start </th>
                                <th> Finish </th>

                                <th className="adminHeading-content">
                                    <p className="adminHeading-p">
                                        Date 
                                    </p>
                                    <span className="arrowFlex">
                                        {sortByDate ?
                                            <GoTriangleUp className="color-zan cursor" onClick={handleDateSort}/>
                                            : <GoTriangleDown className="color-zan cursor" onClick={handleDateSort}/>}
                                    </span>
                                </th>

                                <th className="adminHeading-content">
                                    <p className="adminHeading-p">
                                        Total 
                                    </p>
                                    <span className="arrowFlex">
                                        {sortByTotal ?
                                            <GoTriangleUp className="color-zan cursor" onClick={handleTotalSort}/>
                                            : <GoTriangleDown className="color-zan cursor" onClick={handleTotalSort}/>}
                                    </span>
                                </th>

                                <th> Notes </th>
                            </tr> 
                        </thead>
                    </Table>
                    <div className="scroll">
                        {reports.map( value =>{return <RowReportsTable key={value.Id} report={value} isAdmin={true}/>})}   
                    </div>
                </div> : <h3>No reports found...</h3>}
            </div>
        </div>
    )
}