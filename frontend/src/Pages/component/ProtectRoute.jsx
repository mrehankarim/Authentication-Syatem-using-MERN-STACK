import React,{useContext} from 'react'
import { loginContext } from './contextapi'
import { Navigate } from 'react-router-dom'
const ProtectRoute = ({children}) => {
    const {loggedIn,setLoggedIn}=useContext(loginContext)
    return loggedIn ? children : <Navigate to="/login" />;
}

export default ProtectRoute
