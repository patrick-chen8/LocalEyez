import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { Outlet, Route, Navigate, BrowserRouter, NavLink } from "react-router-dom";
import Home from "../pages/Home"

const useAuth = () => {
    if (sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("status") == "inactive") {
        return true
    } else {
        return false
    }
}

const InactiveCustomerRoutes = () => {
    const isAuth = useAuth()
    console.log(sessionStorage.getItem("status"))
    console.log(sessionStorage.getItem("loggedIn"))
    return isAuth ? <Outlet /> : <Home /> 
}

export default InactiveCustomerRoutes;