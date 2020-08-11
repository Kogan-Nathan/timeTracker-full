import React, {useState, useEffect} from 'react'
import  { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import moment from 'moment'
import RowSummary from './RowSummary'

export default function ThisMonth() {

    const [reportForMonth, setReportForMonth] = useState([])
    const [totalHours, setTotalHours] = useState()
    const token = useSelector(state=>state.isLogged.token)

    //----------------------------------------------------------
    useEffect(()=>{
        let isCanclled = false
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> {
            if(!isCanclled){
                onlyThisMonth(data)
            }})
        .catch(error=> console.error('Error: ', error))
            
        return()=>{
            isCanclled = true
        }
    },[token]);

    //----------------------------------------------------------
    // filtering reports for the current month
    const onlyThisMonth = (reportByUser) =>{ 
        if (reportByUser.length > 0){
            let startOfMonth = moment().startOf('month')
            let endOfMonth   = moment().endOf('month')
            // the reports for the current month --- >
            let tempfilter = reportByUser.filter(report => moment(report.Date).isBetween(startOfMonth, endOfMonth, undefined, []))
            setReportForMonth(tempfilter)                  
            totalHoursCalc(tempfilter)
        }
    }
    //----------------------------------------------------------
    // calculating the total hours for current month, and formating it to "00:00"
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
            <h3 className="h-spesific"> This Month </h3>
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
            {reportForMonth.map((value,index)=>{return <RowSummary key={"report"+index} report={value}/>})}        
            <div>
                <button className="total-butt" style={{marginTop:"20px"}}> Total: {totalHours} </button>
            </div>
        </div>
    )
}