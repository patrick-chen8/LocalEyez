import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter, Navigate } from "react-router-dom";

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      fname: "",
      lname: "",
      phone: "",
      status: "",
      rememberMe: false,
      failure: "",
      promo: false,
      admin: false,
      status: "",
      id: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    async handleSubmit(e) {
      e.preventDefault();
    
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      //const newPerson = { ...form };
      const potentialUser = {
        email: this.state.email,
        password: this.state.pass,
      }
    
      
      const response = await fetch("http://localhost:5000/users/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(potentialUser),
      })
      .catch(error => {
       window.alert(error);
        return;
      });
      //console.log(response.ok);
      console.log(response);
      const record = await response.json();
      if (response.status == 404) {
        window.alert("Incorrect username or password");
        return;
      }
      if (response.status == 400) {
        window.alert("Invalid format of either email or password");
        return;
      }
        console.log(record);
        
        console.log(record.lastName )
        console.log(record.firstName )
        console.log(record.number )
        this.setState({fname: record.firstName});
        this.setState({lname: record.lastName});
        this.setState({phone: record.number});
        this.setState({promo: record.promo});
        this.setState({admin: record.admin});
        this.setState({status: record.status});
        this.setState({id: record._id});
        this.createSession();

        console.log(this.state.email + this.state.pass + this.state.fname + this.state.lname + this.state.phone)
        if (sessionStorage.getItem("checkout") === "true") {
            window.location.href = "/ordersummary"
            return
        }
        window.location.href = "/home";
    }


    createSession(event) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("email", this.state.email);
        sessionStorage.setItem("fname", this.state.fname);
        sessionStorage.setItem("lname", this.state.lname);
        sessionStorage.setItem("phone", this.state.phone);
        sessionStorage.setItem("promo", this.state.promo);
        sessionStorage.setItem("admin", this.state.admin);
        sessionStorage.setItem("status", this.state.status);
        sessionStorage.setItem("id", this.state.id);
        console.log(this.state.fname)
        console.log(this.state.lname)
        console.log(this.state.phone)
        console.log(this.state.admin)
    }
    


    displayFailure(event) {
        this.setState({pass: ''});
        alert("The email or password entered were incorrect. Please try again.");
        event.preventDefault(event);
    }

    handleInputChange(event) {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState({
        [name]: value
      });
    }

  render() {
    return (
      <div>
          <div class="login">
            <h1>Sign In</h1>
            <form method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email</label><br></br>
                <input class="textfield" type="email" id="email" name="email" required value={this.state.email} onChange={this.handleInputChange}></input><br></br>
                <label htmlFor="pass">Password</label><br></br>
                <input class="textfield" type="password" id="pass" name="pass" required value={this.state.pass} onChange={this.handleInputChange}></input><br></br><br></br>
                <input class="submit" type="submit" value="Log In"></input>
            </form> 
            <h5 hidden>{this.state.failure}</h5>
            <a class="forgotPass" href="./forgotpasswordemail">Forgot Password</a>
            <a class="newAccount" href="./createaccount">Create New Account</a>
        </div>
      </div>
    )
  }
}

export default Login;