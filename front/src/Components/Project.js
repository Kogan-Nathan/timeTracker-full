import React, {useState, useEffect} from 'react'
import  { useSelector } from 'react-redux'
import RowProject from './RowProject'
import Table from 'react-bootstrap/Table'
import moment from 'moment'

export default function Project() {
    const [reportsData, setReportsData] = useState([]);
    const token = useSelector(state=>state.isLogged.token)

    useEffect(()=>{
        let isCanclled = false

        fetch('http://localhost:9000/reports', {headers: {'auth-token' : `${token}`}})
        .then(response=> response.json())
        .then(data=>{
            if(!isCanclled){
                handleReports(data)
            }})
        .catch(error=> console.error('Error: ', error)
        )

        return()=>{
            isCanclled = true
        }
    },[]);
    //----------------------------------------------------------
    // function to calculate for each project the amount of hrs -> get each project his client
    const handleReports=(reports)=>{
        // projectsArray gives us the array with each project that the user has a report of
        let projectsArray = reports.map((report) => report.ProjectName).filter((name, index, array)=> array.indexOf(name)=== index)
        // creats an array with an objwct for each project
        let tempArray=projectsArray.map(project => {
            return {
                name: project,
                milli: 0,
                status: "",
                client: ""
            } 
         })
        //double loop that for each existing project, adds the milliseconds of the report
        for (let j = 0; j < tempArray.length; j++) {
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].ProjectName===projectsArray[j]) {
                    let singleStatus = moment.duration(reports[i].Status) 
                    tempArray[j].milli += singleStatus._milliseconds 
                }
            }
            //After we've finished with each project, we'll convert the milliseconds to "hh:mm" format
                //Get remainder from hours and convert to hours
                let hours = tempArray[j].milli / (1000*60*60);
                let absoluteHours = Math.floor(hours);
                let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
                
                //Get remainder from hours and convert to minutes
                let minutes = (hours - absoluteHours) * 60;
                let absoluteMinutes = Math.floor(minutes);
                let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
                tempArray[j].status =  h + ':' + m;
        }
        setReportsData(tempArray);
    }

    //----------------------------------------------------------
    return (
        <div className="container">
            <div className="tableConatainer tableProjects">
                <Table className="tableProjectsHeadingUser">
                    <thead className="trHeading">
                        <tr>
                            <th> project name </th>
                            <th> client  </th>
                            <th> status  </th>
                        </tr> 
                    </thead>
                </Table>
            </div>
            <div className="scroll">
            {reportsData.map((value,index)=>{return <RowProject key={"project"+index} project={value}/>})}
            </div>
        </div>    
    )
}