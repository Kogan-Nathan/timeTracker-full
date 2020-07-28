import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import moment from 'moment'
import {useSelector} from 'react-redux'
import SummaryRow from './SummaryRow'


export default function ThisMonth() {

    const users = useSelector(state=>state.Users)
    const UserIndex = useSelector(state=>state.isLogged.userIndex)
    const [reportForMonth, setReportForMonth] = useState([])
    const [total, setTotal] = useState()
    const [renderDB, setRenderDB] = useState(false)
    //----------------------------------------------------------
    useEffect(()=>{
        fetch('http://localhost:9000/reports')
        .then(response=> response.json())
        .then(data=> onlyThisMonth(data))
        .catch(error=> console.error('Error: ', error)
        )
    },[renderDB]);

    //----------------------------------------------------------
    const onlyThisMonth = (reportData) =>{
        console.log(users);
        
        if (reportData.lenght > 0){
            let startOfMonth = moment().startOf('month')
            let endOfMonth   = moment().endOf('month')
            // filter by user id --- >
            let tempReports = reportData.filter(value => value.UserId===users[UserIndex].id)
            // the reports for the current month --- >
            let tempfilter = tempReports.filter(report => moment(report.Date).isBetween(startOfMonth, endOfMonth))
            setReportForMonth(tempfilter)                          
            totalCalc(tempfilter)
        }
        setRenderDB(true)
    }
    //----------------------------------------------------------
    const totalCalc=(tempfilter)=>{
        let totalHoursArray = tempfilter.map(report => report.Status)        
        totalHoursArray = totalHoursArray.slice(1).reduce((prev, cur)=> moment.duration(cur).add(prev), moment.duration(totalHoursArray[0]))
        let convertHours = moment.duration(totalHoursArray).asHours() 
        let totalTime = moment.duration(convertHours, 'hours');
        let hours = Math.floor(totalTime.asHours());
        let mins  = Math.floor(totalTime.asMinutes()) - hours * 60;
        let result = hours + ":" + mins;
        setTotal(result)
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
            {reportForMonth.map((value,index)=>{return <SummaryRow key={"report"+index} report={value}/>})}        
            
        <div> <button className="total-butt" style={{marginTop:"20px"}}> Total: {total} </button> </div>        
        </div>
    )
}