import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter, NavLink } from "react-router-dom";

export default function EmptyNavbar() {
    return (
    <header>
        <img class="logo" src={require("../images/logo.png")} alt="logo"></img>
        <NavLink class="siteName" to="./home">C7 Cinemas</NavLink>
        <div hidden class="searchLineHome">
           <input hidden class="searchBar" type="search" placeholder="Enter a Movie Title"></input>
            <button hidden class="searchButton">Search</button>
        </div>
        <nav hidden>
            <ul class="nav_links">
                <li><NavLink to="./browse">Browse</NavLink></li>
                <li><NavLink to="./search">Search</NavLink></li>
                <li><NavLink to="./login">Login</NavLink></li>
            </ul>
        </nav>
      </header>
    )
}