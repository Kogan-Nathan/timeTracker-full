import React, {useState, useEffect} from 'react'
import  { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import moment from 'moment'
import SummaryRow from './SummaryRow'

export default function ThisMonth(props) {

    const [reportForMonth, setReportForMonth] = useState([])
    const [total, setTotal] = useState()
    const [renderDB, setRenderDB] = useState(false)
    const token = useSelector(state=>state.isLogged.token)

    //----------------------------------------------------------
    useEffect(()=>{
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=> onlyThisMonth(data))
        .catch(error=> console.error('Error: ', error))
    },[reportForMonth]);

    //----------------------------------------------------------
    const onlyThisMonth = (reportData) =>{ 
        renderPage()
        if (reportData.length > 0){
            let startOfMonth = moment().startOf('month')
            let endOfMonth   = moment().endOf('month')
            // the reports for the current month --- >
            let tempfilter = reportData.filter(report => moment(report.Date).isBetween(startOfMonth, endOfMonth))
            setReportForMonth(tempfilter)                          
            totalCalc(tempfilter)
        }
    }
    //----------------------------------------------------------
    const totalCalc=(tempfilter)=>{
        renderPage()
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

    const renderPage=()=>{
        setRenderDB(!renderDB)
    }


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
            <div>
                <button className="total-butt" style={{marginTop:"20px"}}> Total: {total} </button>
            </div>
        </div>
    )
}