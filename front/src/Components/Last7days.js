import React, {useState, useEffect} from 'react'
import  { useSelector } from 'react-redux'
import RowSummary from './RowSummary'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

export default function Last7days() {
    
    const [reportForWeek, setReportForWeek] = useState([])
    const [totalHours, setTotalHours] = useState()
    const token = useSelector(state=>state.isLogged.token)
    //----------------------------------------------------------
    useEffect(()=>{
        let isCanclled = false;
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled){
                onlyThisWeek(data)
            }})
            .catch(error=> console.error('Error: ', error))
            
        return()=>{
            isCanclled = true;
        }
    },[token]);
    //----------------------------------------------------------
    // filtering reports for the last 7 days
    const onlyThisWeek = (reportsByUser) =>{ 
        if(reportsByUser.length > 0){
            let startDate = moment().subtract(7, 'days') // gives you the start date 
            let endDate = moment() // todays date as object
            let tempfilter = reportsByUser.filter(report => moment(report.Date).isBetween(startDate, endDate, undefined, []))
            setReportForWeek(tempfilter)
            totalHoursCalc(tempfilter)
        } 
    }
    //----------------------------------------------------------
    // calculating the total hours for last 7 days, and formating it to "00:00"
    const totalHoursCalc=(tempfilter)=>{
        let totalHoursArray = tempfilter.map(report => report.Status)        
        totalHoursArray = totalHoursArray.slice(1).reduce((prev, cur)=> moment.duration(cur).add(prev), moment.duration(totalHoursArray[0]))
        let convertHours = moment.duration(totalHoursArray).asHours() 
        let totalTime = moment.duration(convertHours, 'hours');
        let hours = Math.floor(totalTime.asHours());
        let mins  = Math.floor(totalTime.asMinutes()) - hours * 60;
        let result = hours + ":" + mins;
        setTotalHours(result)
    }
    //----------------------------------------------------------
    return (
        <div className="main">
                <h3 className="h-spesific"> Last 7 days </h3>
                <div className="tableConatainer tableProjects">
                    <Table className="tableProjectsHeading">
                        <thead>
                            <tr className="trHeading">
                                <th> Project Name </th>
                                <th> Client  </th>
                                <th> Status  </th>
                                <th> Date  </th>
                            </tr> 
                        </thead>
                    </Table>
                </div>
            {reportForWeek.map((value,index)=>{return <RowSummary key={"report"+index} report={value}/>})}
            <div> <button className="total-butt" style={{marginTop:"20px"}} > Total: {totalHours} </button> </div>
        </div>
    )
}