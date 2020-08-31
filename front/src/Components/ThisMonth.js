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
            tempfilter = tempfilter.sort((a,b) => new Date(b.Date) - new Date(a.Date))
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
        hours = ((hours > 9) ? hours : ("0"+hours))
        mins = ((mins > 9) ? mins : ("0"+mins))
        let result = hours + ":" + mins;
        setTotalHours(result)
    }
    //----------------------------------------------------------
    return (
        <div className="container">
            <h3 className="h-spesific"> This Month </h3>
            <div className="tableConatainer tableProjects">
                <Table className="tableProjectsHeadingUser">
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
            <div className="scroll">
            {reportForMonth.map((value,index)=>{return <RowSummary key={"report"+index} report={value}/>})}       
            </div> 
            <hr className="hrBorder"/>
            <div className="totalDiv"> <span style={{fontWeight:"600"}}> Total hrs: </span> {totalHours} </div>
        </div>
    )
}