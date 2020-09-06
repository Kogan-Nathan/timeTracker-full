import React,{useState, useEffect} from 'react'

export default function SearchByCompany(props) {

    const [companies, setCompanies] = useState([])
    const [pageRender, setPageRender] = useState(false)

    useEffect(()=>{
        setTimeout(() => {
            fetch('http://localhost:9000/adminInfo')
            .then(response=> response.json())
            .then(data=> handleCompanies(data))
            .catch(error=> console.error('Error: ', error))
            }, 200);
        },[pageRender]);
    //----------------------------------------------------------
    const handleCompanies=(adminsArray)=>{
        let tempArray = adminsArray.map(value => value.company)
        setCompanies(tempArray)
    }
    //----------------------------------------------------------
    const togglePopup=()=>{
        setPageRender(!pageRender)
        props.DeletePopup()
    }
    //----------------------------------------------------------
    const handleSelect=(value)=>{
        props.Filter(value)
        console.log(value);
    }
    //----------------------------------------------------------
    const searchInput=(e)=>{
        //onKeyUp search updates a temporary array that is displayed through map 
        if(props.filterByCompany.length>0){
            if(props.displayPage==="Employees"||props.displayPage==="Reports-by-employee"){
                let tempArray = props.filterByCompany.filter(value => {
                let lowerCaseName = value.name.toLowerCase();
                    for (let index = 0; index < lowerCaseName.length; index++) {
                        if(lowerCaseName.indexOf(e.target.value)===0){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                })
                props.SearchArray(tempArray)
            }
            else if(props.displayPage==="Projects"||props.displayPage==="Reports-by-project"){
                let tempArray = props.filterByCompany.filter(value => {
                let lowerCaseName = value.projectName.toLowerCase();
                    for (let index = 0; index < lowerCaseName.length; index++) {
                        if(lowerCaseName.indexOf(e.target.value)===0){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                })
                props.SearchArray(tempArray)
            }
            else{
                let tempArray = props.filterByCompany.filter(value => {
                    let lowerCaseName = value.adminName.toLowerCase();
                        for (let index = 0; index < lowerCaseName.length; index++) {
                            if(lowerCaseName.indexOf(e.target.value)===0){
                                return true
                            }
                            else{
                                return false
                            }
                        }
                    })
                    props.SearchArray(tempArray)
            }            
        }
        else{
            if(props.displayPage==="Employees"||props.displayPage==="Reports-by-employee"){
                let tempArray = props.Users.filter(value => {
                let lowerCaseName = value.name.toLowerCase();
                    for (let index = 0; index < lowerCaseName.length; index++) {
                        if(lowerCaseName.indexOf(e.target.value)===0){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                })
                props.SearchArray(tempArray)
            }
            else if(props.displayPage==="Projects"||props.displayPage==="Reports-by-project"){
                let tempArray = props.Projects.filter(value => {
                let lowerCaseName = value.projectName.toLowerCase();
                    for (let index = 0; index < lowerCaseName.length; index++) {
                        if(lowerCaseName.indexOf(e.target.value)===0){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                })
                props.SearchArray(tempArray)
            }
            else{
                let tempArray = props.Admins.filter(value => {
                    let lowerCaseName = value.adminName.toLowerCase();
                        for (let index = 0; index < lowerCaseName.length; index++) {
                            if(lowerCaseName.indexOf(e.target.value)===0){
                                return true
                            }
                            else{
                                return false
                            }
                        }
                    })
                    props.SearchArray(tempArray)
            }
        }
        props.SearchValue(e.target.value)
    }

    return (
        <div className="grid_super_search">
            <div className="a"></div> 
            <select className="inputTime super_select" onChange={((e)=>{handleSelect(e.target.value)})}>
                <option value="">show all</option>
                {companies.map( value =>{
                    return <option key={value}>{value}</option>
                })}  
            </select>    
            <input type="text" className="search-bar search" onKeyUp={(e)=>{searchInput(e)}} placeholder="Search.."/>
            <button className="button addAdmin-butt add" onClick={togglePopup} disabled={props.Empty}>Delete</button>
            <div className="a"></div> 
        </div>
    )
}