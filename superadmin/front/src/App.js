import React ,{useState, useEffect} from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './Components/General-Components&Pages/Login'
import Header from './Components/General-Components&Pages/Header'
import Footer from './Components/General-Components&Pages/Footer';
import Admin from './Components/Managers/Main-Page/AdminPage';
import Homepage from './Components/General-Components&Pages/HomePage.jsx';
import UserPage from './Components/Employee/Main-page/UserPage';
import pageNotFound from './Components/General-Components&Pages/pageNotFound.jsx';
import SuperAdmin from './Components/Super-Admin/Main-page/SuperAdmin';
import './App.css';

function App() {
  let UserId = parseInt(localStorage.getItem('UserId'))
  const IsLoggedInfo = useSelector(state=> state.isLogged.email)
  const token = useSelector(state=>state.isLogged.token)
  const role = useSelector(state=>state.isLogged.role)
  const [company, setCompany]= useState()

  useEffect(()=>{
    if(role==="employee"){
    fetch('http://localhost:9000/getCompanyUser', {headers: {'auth-token' : `${token}`}})
    .then(response=> response.json())
    .then(data=> setCompany(data))
    .catch(error=> console.error('Error: ', error))
    }
    if(role==="manager"){
    fetch('http://localhost:9000/getCompanyAdmin', {headers: {'auth-token' : `${token}`}})
    .then(response=> response.json())
    .then(data=> setCompany(data))
    .catch(error=> console.error('Error: ', error))
    }
    
  },[token, UserId]);

  //----------------------------------------------------------
  const AdminPrivateRoute = ({component: Component})=> {
    return(
      <Route render={()=>{
        if(token){
          if(role==="manager"){
            return(
              <Component/>
            )
          }
          else{
            return(
              <Redirect to="*" />
            )
          }
        }
        else{
          return(
            <Redirect to="/login" />
          )
        }
      }}/>
    )
  }
  //----------------------------------------------------------
    const UserPrivateRoute = ({component: Component})=> {
    return(
      <Route render={()=>{
        if(token){
          if(role==="employee"){
            return(
              <Component/>
            )
          }
          else{
            return(
              <Redirect to="*" />
            )
          }
        }
        else{
          return(
            <Redirect to="/login" />
          )
        }
      }}/>
    )
  }
  //----------------------------------------------------------
  const SuperAdminRoute = ({component: Component})=> {
    return(
      <Route render={()=>{
        if(IsLoggedInfo==="timeAdmin@zangula.com"){
            return(
              <Component />
            )
          }
          else{
            return(
              <Redirect to="/login"/>
            )
          }
        }}/>
    )
  }
  //----------------------------------------------------------

  return (
    <div className="App">
      <Router>
        {/* Header */}
        <Header/>
        <Switch>
          {/* Routes */}
          <Route exact path="/" component={()=>{return <Homepage/>}}/>
          <Route exact path="/login" component={()=>{return <Login/>}}/>

          <SuperAdminRoute exact path="/super-admin" component={()=>{return <SuperAdmin/>}}/>

          <AdminPrivateRoute exact path={`/${company}/admin=${UserId}`} component={()=>{return <Admin company={company} adminID={UserId} displayPage={"Users"}/>}}/>
          <AdminPrivateRoute exact path={`/${company}/admin=${UserId}/users`} component={()=>{return <Admin company={company} adminID={UserId}  isReport={false} displayPage={"Users"}/>}}/>
          <AdminPrivateRoute exact path={`/${company}/admin=${UserId}/projects`} component={()=>{return <Admin  company={company} adminID={UserId}  isReport={false} displayPage={"Projects"}/>}}/>
          <AdminPrivateRoute exact path={`/${company}/admin=${UserId}/reports-by-project`} component={()=>{return <Admin  company={company} adminID={UserId}  isReport={true} displayPage={"Reports By Project"}/>}}/>
          <AdminPrivateRoute exact path={`/${company}/admin=${UserId}/reports-by-user`} component={()=>{return <Admin  company={company} adminID={UserId}  isReport={true} displayPage={"Reports By User"}/>}}/>

          <UserPrivateRoute exact path={"/timetracker/user="+UserId} component={()=>{return <UserPage company={company} userid={UserId} displayPage={"Timetracker"}/>}}/>
          <UserPrivateRoute exact path={"/project/user="+UserId} component={()=>{return <UserPage userid={UserId} displayPage={"Project"}/>}}/>
          <UserPrivateRoute exact path={"/users/user="+UserId} component={()=>{return <UserPage company={company} userid={UserId} displayPage={"Users"}/>}}/>
          <UserPrivateRoute exact path={"/last7days/user="+UserId} component={()=>{return <UserPage userid={UserId} displayPage={"Last 7 days"}/>}}/>
          <UserPrivateRoute exact path={"/thismonth/user="+UserId} component={()=>{return <UserPage userid={UserId} displayPage={"This month"}/>}}/>
          <UserPrivateRoute exact path={"/spesifictime/user="+UserId} component={()=>{return <UserPage userid={UserId} displayPage={"Spesific time"}/>}}/>
          <Route exact path="*" component={pageNotFound}/>

        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;