import React ,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Header from './Components/Header'
import Footer from './Components/Footer';
import Admin from './Components/AdminPage';
import Homepage from './Components/HomePage';
import UserPage from './Components/UserPage'
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  let UserIndex = localStorage.getItem('UserIndex')
  const [dbRender, setDbRender] = useState(false)
  const IsLoggedInfo = useSelector(state=> state.isLogged.email)
  const token = useSelector(state=>state.isLogged.token)
  const [userName,setUserName] = useState()
  useEffect(()=>{
    fetch('http://localhost:9000/users')
    .then(response=> response.json())
    .then(data=> setUsers(data))
    .catch(error=> console.error('Error: ', error))
   

  },[dbRender]);

  const PrivateRoute = ({component: Component})=> {
    fetch('http://localhost:9000/getIndex', {headers: {'auth-token' : `${token}`}})
    .then(response=> response.json())
    .then(data=> UserIndex = data)
    .catch(error=> console.error('Error: ', error))

    return(
      <Route render={()=>{
        if(IsLoggedInfo){
          let userid = users.findIndex(users => users.email === IsLoggedInfo) + 1 
          setUserName(users[userid-1].name)
          if(UserIndex == userid){
            return(
              <Component/>
            )
          }
          if(UserIndex!==userid){
            return(
              <Redirect to="/login" />
            )
          }
        }
        else{
          return(
            <Redirect to="/login" />
          )
        }
      }
    }/>
    )
  }


  // const IsLoggedRoute = ({component: Component})=> {
  //   return(
  //     <Route render={()=>{
  //       if(IsLoggedInfo){
  //         return(
  //           <Redirect to="/" />
  //         )
  //       }
  //       else{
  //         return(
  //           <Component/>
  //         )
  //       }
  //     }}/>
  //   )
  // }

  const AdminRoute = ({component: Component})=> {
    return(
      <Route render={()=>{
        setUserName("")
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

  const renderPage=()=>{
    setDbRender(!dbRender)
}
  
  return (
    <div className="App">
      <Router>
        {/* Header */}
        <Header userName={userName}/>
        <Switch>
          {/* Routes */}
          <Route exact path="/" component={()=>{return <Homepage/>}}/>
          <Route exact path="/signup" component={()=>{return <SignUp/>}}/>
          <Route exact path="/login" component={()=>{return <Login/>}}/>
          <AdminRoute exact path="/admin" component={()=>{return <Admin displayPage={"Users"} class={true} />
          }}/> 
          <AdminRoute exact path="/admin/users" component={()=>{return <Admin displayPage={"Users"} class={true}/>
          }}/>
          <AdminRoute exact path="/admin/projects" component={()=>{return <Admin displayPage={"Projects"} class={false}/>
          }}/>
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/timetracker/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"Timetracker"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/project/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"Project"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/users/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"Users"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/last7days/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"Last 7 days"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/thismonth/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"This month"}/>}}/>
          })}
          {users.map((user,index)=>{
            return <PrivateRoute exact path={"/spesifictime/user="+user.id} key={"user"+index} component={()=>{return <UserPage displayPage={"Spesific time"}/>}}/>
          })}
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
