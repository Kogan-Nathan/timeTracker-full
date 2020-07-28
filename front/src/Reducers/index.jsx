import {combineReducers} from 'redux'
import AdminReducer from './Admin'
import UsersReducer from './Users'
import ProjectsReducer from './Projects'
import isLoggedReducer from './isLogged'
import reportInfo from './reportReducer'

const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    Admin : AdminReducer,
    Users : UsersReducer,
    Projects : ProjectsReducer,
    reportData : reportInfo
});

export default allReducers;