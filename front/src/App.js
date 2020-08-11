import React ,{useState, useEffect} from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Header from './Components/Header'
import Footer from './Components/Footer';
import Admin from './Components/AdminPage';
import Homepage from './Components/HomePage';
import UserPage from './Components/UserPage'
import pageNotFound from './Components/pageNotFound'
import './App.css';

function App() {
  let UserIndex = parseInt(localStorage.getItem('UserId'))
  let UserId = parseInt(localStorage.getItem('UserId'))
  const [users, setUsers] = useState([]);
  const IsLoggedInfo = useSelector(state=> state.isLogged.email)
  const token = useSelector(state=>state.isLogged.token)
  const [dbRender, setDbRender] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:9000/users')
    .then(response=> response.json())
    .then(data=> handleUsers(data))
    .catch(error=> console.error('Error: ', error))

  },[dbRender]);
  //----------------------------------------------------------
  const handleUsers=(usersDB)=>{
    setUsers(usersDB)
  }
  //----------------------------------------------------------
  const PrivateRoute = ({component: Component})=> {
      fetch('http://localhost:9000/getIndex', {headers: {'auth-token' : `${token}`}})
      .then(response=> response.json())
      .then(data=> UserIndex = data)
      .catch(error=> console.error('Error: ', error))

    return(
      <Route render={()=>{
        if(IsLoggedInfo){
          if( UserIndex === UserId){
            return(
              <Component/>
            )
          }
          if(UserIndex !== UserId){
            return(
              <Redirect to="/login" />
            )
          }
        }
        else{
          return(
            <Redirect to="/login"/>
          )
        }
      }
    }/>
    )
  }
  //----------------------------------------------------------
  const AdminRoute = ({component: Component})=> {
    return(
      <Route render={()=>{
        if(IsLoggedInfo==="timeAdmin@zangula.com"){
            return(
              <Component />
            )
          }
          else{
            return(
              <Redirect to="/"/>
            )
          }
        }}/>
    )
  }
  //----------------------------------------------------------
  const renderPage=()=>{
    setDbRender(true)
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
          <Route exact path="/signup" component={()=>{return <SignUp reRender={renderPage}/>}}/>
          <Route exact path="/login" component={()=>{return <Login/>}}/>
          <AdminRoute exact path="/admin" component={()=>{return <Admin displayPage={"Users"} class={true} />
          }}/> 
          <AdminRoute exact path="/admin/users" component={()=>{return <Admin displayPage={"Users"} class={true}/>
          }}/>
          <AdminRoute exact path="/admin/projects" component={()=>{return <Admin displayPage={"Projects"} class={false}/>
          }}/>
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/timetracker/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"Timetracker"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/project/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"Project"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/users/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"Users"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/last7days/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"Last 7 days"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/thismonth/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"This month"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/spesifictime/user="+user.id} key={"user"+index} component={()=>{return <UserPage userid={UserId} displayPage={"Spesific time"}/>}}/>
          })}
          <Route exact path="*" component={pageNotFound}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;