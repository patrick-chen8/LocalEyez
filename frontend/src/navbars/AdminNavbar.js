import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter, NavLink } from "react-router-dom";

export default function AdminNavbar() {
    return (
    <header>
        <img class="logo" src={require("../images/logo.png")} alt="logo"></img>
        <NavLink class="siteName" to="./admin/home">C7 Cinemas</NavLink>
        <div hidden class="searchLineHome">
           <input hidden class="searchBar" type="search" placeholder="Enter a Movie Title"></input>
            <button hidden class="searchButton">Search</button>
        </div>
        <nav>
            <ul class="nav_links">
            <li><NavLink to="./admin/search">Search</NavLink></li>
                <li><NavLink to="./admin/addmovie">Movies</NavLink></li>
                <li><NavLink to="./admin/managepromos">Promotions</NavLink></li>
                <li><NavLink to="./admin/manageusers">Users</NavLink></li>
                <li><NavLink to="./admin/profile">Profile</NavLink></li>
            </ul>
        </nav>
      </header>
    )
}