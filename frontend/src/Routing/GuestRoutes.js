import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { Outlet, Route, Navigate, BrowserRouter, NavLink } from "react-router-dom";
import Home from "../pages/Home"

const useAuth = () => {
    if (sessionStorage.getItem("loggedIn") == "true") {
        return false
    } else {
        return true
    }
}

const GuestRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Home /> 
}

export default GuestRoutes;