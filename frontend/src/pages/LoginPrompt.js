import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

export default function LoginPrompt() {
  return (
    <div>
    <div class="loginPrompt">
        <h1 class="loginPromptTitle">Sign In or Create an Account to Continue</h1>
        
        <a class="loginLink" href="./login">Login</a>
        <a class="newAccount" href="./createaccount">Create New Account</a>
    </div>
    </div>
  )
}