import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { Outlet, Route, Navigate, BrowserRouter, NavLink } from "react-router-dom";
import Home from "../pages/Home"
import CreateConfirmation from "../pages/CreateConfirmation"

const useAuth = () => {
    if (sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("status") == "active") {
        return true
    } else {
        return false
    }
}

const inactiveCheck = () => {
    if (sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("status") == "inactive") {
        return true
    } else {
        return false
    }
}

const CustomerRoutes = () => {
    const isInactive = inactiveCheck()
    const isAuth = useAuth()
    if (isInactive) {
        return <CreateConfirmation />
    }
    return isAuth ? <Outlet /> : <Home /> 
}

export default CustomerRoutes;