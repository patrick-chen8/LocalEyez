import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: window.sessionStorage.getItem("email"),
      code: "",
      failure: ""
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

  async handleSubmit(event) {
    event.preventDefault()

    const query = {
        email: this.state.email,
        token: this.state.code,
    }
    console.log(query)

    const response = await fetch("http://localhost:5000/users/verifyforgetpassword", {
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
            window.alert("Incorrect code");
            return;
        } else {
            window.sessionStorage.setItem("email", this.state.email)
            window.location.href = "/changepassword";
        }

        const record = await response.json();
        console.log(record);
        console.log(record.password);
        window.location.href = "/forgotpassword";

        //window.location.href = "/home";
  }

  displayFailure(event) {
    this.setState({pass: ''});
    alert("The email or password entered were incorrect. Please try again.");
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <div class="login">
              <h1>Forgot Password</h1>
              <p>A verification code has been sent to {window.sessionStorage.getItem("email")}</p>
              <form onSubmit={this.handleSubmit}>
                  <label for="code">Enter verification code: </label><br></br>
                  <input class="textfield" type="text" id="code" name="code" required value={this.state.code} onChange={this.handleInputChange}></input><br></br>
                  <input class="submit" type="submit" value="Enter"></input>
              </form> 
          </div>
      </div>
    )
  }
}

export default ForgotPassword;