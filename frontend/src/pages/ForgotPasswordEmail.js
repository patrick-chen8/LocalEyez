import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class ForgotPasswordEmail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Send email with verification code
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

async handleSubmit(e) {
  e.preventDefault();


  // When a post request is sent to the create url, we'll add a new record to the database.
  //const newPerson = { ...form };
  const potentialUser = {
    email: this.state.email,
  }

  const response = await fetch("http://localhost:5000/users/forgetpassword", {
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
  console.log(response);
    if (!response.ok) {
        window.alert("Incorrect email");
        return;
    } else {
        window.sessionStorage.setItem("email", this.state.email)
        window.location.href = "/forgotpassword";
    }
  }

  displayFailure(event) {
    this.setState({pass: ''});
    alert("The email entered was invalid. Please try again.");
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <div class="login">
              <h1>Forgot Password</h1>
              <p>Enter your email address to reset your password</p>
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor="email">Enter Email: </label><br></br>
                  <input class="textfield" type="text" id="email" name="email" required value={this.state.email} onChange={this.handleInputChange}></input><br></br><br></br>
                  <input class="submit" type="submit" value="Enter"></input>
              </form> 
          </div>
      </div>
    )
  }
}

export default ForgotPasswordEmail;