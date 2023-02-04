import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class CreateConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confCode: ""
    };
    sessionStorage.setItem("empty", true);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
  
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    //const newPerson = { ...form };
    const potentialUser = {
      email: sessionStorage.getItem("email"),
      token: this.state.confCode,
    }
  
    console.log(potentialUser)
    
    const response = await fetch("http://localhost:5000/users/verify", {
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
    console.log(response.message)

    const record = await response.json();
    console.log(record);
    console.log(record.message);

    if (record.message == "Failure") {
        window.alert("Failed to verify your account")
    } else if (record.message == "Success") {
        sessionStorage.setItem("status", "active");
        sessionStorage.setItem("empty", "false");
        if (sessionStorage.getItem("checkout") === "true") {
            window.location.href = "/ordersummary"
            return
        }
        window.location.href = "/home";
    } else {
        window.alert("Message error")
    }
    
  }

  displayFailure(event) {
    this.setState({confCode: ""});
    alert("The verification code entered was incorrect. Please try again.");
    event.preventDefault();
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
          <div class="createAccount">
              <h1>Account Created Successfully</h1>
              <h2>Verify Email</h2><br></br>
              <p>A verification code has been sent to {sessionStorage.getItem("email")}</p><br></br>
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor="confCode">Enter code:</label>
                  <input class="smalltextfield" type="text" id="confCode" name="confCode" value={this.state.confCode} onChange={this.handleInputChange}></input>
                  <input class="submit" type="submit" value="Enter"></input>
              </form>
              <button hidden>Resend Code</button>
          </div>
      </div>
    )
  }
}

export default CreateConfirmation;