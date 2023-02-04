import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

class CreateAccount extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      pass: "",
      phone: "",
      pAddress: "",
      pCity: "",
      pState: "",
      pZip: "",
      ctype: "",
      cardNum: "",
      cvc: "",
      expiration: "",
      bAddress: "",
      bCity: "",
      bState: "",
      bZip: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  createUserObject() {
    const userObject = {
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        number: this.state.phone,
        status: "inactive",
        rememberMe: false
    }
  }

  createPaymentObject() {
    const paymentObject = {
      ctype: this.state.ctype,
      cardNum: this.state.cardNum,
      cvc: this.state.cvc,
      expiration: this.state.expiration,
      bAddress: this.state.bAddress,
      bCity: this.state.bCity,
      bState: this.state.bState,
      bZip: this.state.bZip
    }
  }

  render() {
    return (
      <div>
          <div class="createAccount">
              <h1>Create Account</h1>
              <form class="form" onSubmit={this.handleSubmit}>
                  <label for="email">Enter Email</label><br></br>
                  <input class="textfield" type="email" id="email" name="email" required value={this.state.email} onChange={this.handleInputChange}></input><br></br>
                  <label for="pwd">Enter Password</label><br></br>
                  <input class="textfield" type="password" id="pwd" name="pwd" required></input><br></br>
                  <label for="pwd">Confirm Password</label><br></br>
                  <input class="textfield" type="password" id="pwd" name="pwd" required value={this.state.pass} onChange={this.handleInputChange}></input><br></br><br></br>

                  <h3>Enter Personal Info</h3>
                  <label for="fname">Enter First Name</label><br></br>
                  <input class="textfield" type="text" id="fname" name="fname" required value={this.state.fname} onChange={this.handleInputChange}></input><br></br>
                  <label for="lname">Enter Last Name</label><br></br>
                  <input class="textfield" type="text" id="lname" name="lname" required value={this.state.lname} onChange={this.handleInputChange}></input><br></br>
                  <label for="phone">Enter Phone Number</label><br></br>
                  <input class="textfield" type="tel" id="phone" name="phone" required value={this.state.phone} onChange={this.handleInputChange}></input><br></br><br></br>
                  
                  <h3>Enter Personal Address Info (optional)</h3>
                  <label for="pAddress">Street Address</label><br></br>
                  <input class="textfield" type="text" id="pAddress" name="pAddress" value={this.state.pAddress} onChange={this.handleInputChange}></input><br></br>
                  <label for="pCity">City</label><br></br>
                  <input class="textfield" type="text" id="pCity" name="pCity" value={this.state.pCity} onChange={this.handleInputChange}></input><br></br>
                  <label for="pState">State</label><br></br>
                  <input class="textfield" type="text" id="pState" name="pState" value={this.state.pState} onChange={this.handleInputChange}></input><br></br>
                  <label for="pZip">Zipcode</label><br></br>
                  <input class="textfield" type="text" id="pZip" name="pZip" value={this.state.pZip} onChange={this.handleInputChange}></input><br></br><br></br>

                  <h3>Enter Payment Details (optional)</h3>
                  <label for="ctype">Enter Card Type</label><br></br>
                  <select class="textfield" name="ctype" id="ctype" value={this.state.ctype} onChange={this.handleInputChange}>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                      <option value="Discover">Discover</option>
                      <option value="Other">Other</option>
                  </select><br></br>
                  <label for="cardNum">Enter Card Number</label><br></br>
                  <input class="textfield" type="number" id="cardNum" name="cardNum" value={this.state.cardNum} onChange={this.handleInputChange}></input><br></br>
                  <label for="cvc">Enter CVC</label><br></br>
                  <input class="textfield" type="number" id="cvc" name="cvc" value={this.state.cvc} onChange={this.handleInputChange}></input><br></br>
                  <label for="expiration">Enter Expiration Date</label><br></br>
                  <input class="textfield" type="month" id="expiration" name="expiration" min="2022-09" value={this.state.expiration} onChange={this.handleInputChange}></input><br></br><br></br>
                  
                  <h4>Enter Billing Address Info (optional)</h4>
                  <label for="bAddress">Street Address</label><br></br>
                  <input class="textfield" type="text" id="bAddress" name="bAddress" value={this.state.bAddress} onChange={this.handleInputChange}></input><br></br>
                  <label for="bCity">City</label><br></br>
                  <input class="textfield" type="text" id="bCity" name="bCity" value={this.state.bCity} onChange={this.handleInputChange}></input><br></br>
                  <label for="bState">State</label><br></br>
                  <input class="textfield" type="text" id="bState" name="bState" value={this.state.bState} onChange={this.handleInputChange}></input><br></br>
                  <label for="bZip">Zipcode</label><br></br>
                  <input class="textfield" type="text" id="bZip" name="bZip" value={this.state.bZip} onChange={this.handleInputChange}></input><br></br><br></br>

                  <input class="submit" type="submit" value="Create Account"></input>
              </form>
          </div>
          <h1 hidden>{this.state.ctype}</h1>
          <h1 hidden>{this.state.expiration}</h1>
      </div>
    )
  }
}

export default CreateAccount;