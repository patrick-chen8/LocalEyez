import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: window.sessionStorage.getItem("email"),
      newPass: "",
      newConfirm: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    async handleSubmit(event) {
      event.preventDefault()
      if (this.state.newPass.localeCompare(this.state.newConfirm) != 0) {
        window.alert("Passwords do not match")
        return
      }

      const query = {
        email: this.state.email,
        password: this.state.newPass,
        }
        console.log(query)

        const response = await fetch("http://localhost:5000/users/changeforgetpassword", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        if (!response.ok) {
            window.alert("Response error");
            return;
        } else {
            window.alert("Password changed. Please log in with your new password.");
            window.sessionStorage.clear()
            window.location.href = "/login";
        }

        const record = await response.json();
        console.log(record);
        console.log(record.password);
        window.location.href = "/forgotpassword";


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
              <h1>Create a New Password</h1>
              <form onSubmit={this.handleSubmit}>
                  <label for="newPass">Enter new password: </label><br></br>
                  <input class="textfield" type="password" id="newPass" name="newPass" required value={this.state.newPass} onChange={this.handleInputChange}></input><br></br>
                  <label for="newConfirm">Confirm new password: </label><br></br>
                  <input class="textfield" type="password" id="newConfirm" name="newConfirm" required value={this.state.newConfirm} onChange={this.handleInputChange}></input><br></br>
                  <input class="submit" type="submit" value="Enter"></input>
              </form> 
          </div>
      </div>
    )
  }
}

export default ChangePassword;