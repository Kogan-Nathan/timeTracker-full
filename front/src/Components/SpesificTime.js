import React, {useState} from 'react'
import  { useSelector } from 'react-redux'
import RowSummary from './RowSummary'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

export default function SpesificTime() {
    const [reportForSpesific, setReportForSpesific] = useState()
    const [toDate, setToDate] = useState()
    const [fromDate, setFromDate] = useState()
    const [totalHours, setTotalHours] = useState()
    const [show, setShow] = useState(false)
    const token = useSelector(state=>state.isLogged.token)

    function getReports(){
        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=>response.json())
        .then(data=>onlySpesificTime(data))
        .catch(error=> console.error('Error: ', error))
    }
    //----------------------------------------------------------
    // get the chosen dates
    const handleToDate=(e)=>{
        setToDate(e.target.value) 
    }
    //----------------------------------------------------------
    const handleFromDate=(e)=>{
        setFromDate(e.target.value)
    }
    //----------------------------------------------------------
    // filtering reports for spesific chosen duration
    const onlySpesificTime = (reportArray) =>{
        if(toDate&&fromDate){
            if(fromDate < toDate){
                if (reportArray.length > 0){
                // the reports for the spesific time choosen --- >
                let tempfilter = reportArray.filter(report => moment(report.Date).isBetween(fromDate, toDate, undefined, []))
                tempfilter = tempfilter.sort((a,b) => new Date(b.Date) - new Date(a.Date))
                setReportForSpesific(tempfilter)    
                totalHoursCalc(tempfilter)
                }
                setShow(true)
            }
            if(fromDate > toDate){
                if (reportArray.length > 0){
                // the reports for the spesific time choosen --- >
                let tempfilter = reportArray.filter(report => moment(report.Date).isBetween(toDate, fromDate, undefined, []))
                tempfilter = tempfilter.sort((a,b) => new Date(b.Date) - new Date(a.Date))
                setReportForSpesific(tempfilter)    
                totalHoursCalc(tempfilter)
                }
                setShow(true)
            }    
        }
    }
    //----------------------------------------------------------
    // calculating the total hours for the chosen time, and formating it to "00:00"
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
            <h3 className="h-spesific"> Choose a Spesific Time </h3>
            <Table className="tableProjects">
                <thead>
                    <tr>
                        <td style={{border:"2px #fff solid"}}  className="td-spesific"> From 
                            <input className="input-spesific cursor" type="date" placeholder="dd/mm/yyyy"
                                max={new Date().toISOString().split("T")[0]} onChange={handleFromDate}>
                            </input>
                        </td>
                        <td style={{border:"2px #fff solid"}}  className="td-spesific"> To 
                            <input className="input-spesific cursor" type="date" placeholder="dd/mm/yyyy"
                                max={new Date().toISOString().split("T")[0]} onChange={handleToDate}>
                            </input>
                        </td>
                        
                        <button className="add-butt spesificButton" onClick={()=> getReports()}>Total hrs: {totalHours}</button>
                        
                    </tr> 
                </thead>
            </Table>
            <div className="tableConatainer tableProjects" style={{marginTop:"10px"}}>
                <Table className="tableProjectsHeadingUser">
                    <thead >
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
            {show && reportForSpesific.map((value,index)=>{return <RowSummary key={"report"+index} report={value}/>})}
            </div>
            <hr className="hrBorder"/>
        </div>
    )
}