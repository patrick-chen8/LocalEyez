import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

export default function EnterPayment() {
  return (
    <div>
        <div class="createAccount">
            <h1>Enter Payment Details</h1><br></br>
            <form method="post">
                <label for="ctype">Enter Card Type</label><br></br>
                <select class="textfield" name="ctype" id="ctype">
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                    <option value="Other">Other</option>
                </select><br></br>
                <label for="cardNum">Enter Card Number</label><br></br>
                <input class="textfield" type="number" id="cardNum" name="cardNum"></input><br></br>
                <label for="cvc">Enter CVC</label><br></br>
                <input class="textfield" type="number" id="cvc" name="cvc"></input><br></br>
                <label for="expiration">Enter Expiration Date</label><br></br>
                <input class="textfield" type="month" id="expiration" name="expiration" min="2022-09"></input><br></br><br></br>
                

                <h3>Enter Billing Address Info</h3><br></br>
                <label for="address">Street Address</label><br></br>
                <input class="textfield" type="text" id="address" name="address"></input><br></br>
                <label for="city">City</label><br></br>
                <input class="textfield" type="text" id="city" name="city"></input><br></br>
                <label for="state">State</label><br></br>
                <input class="textfield" type="text" id="state" name="state"></input><br></br>
                <label for="zip">Zipcode</label><br></br>
                <input class="textfield" type="text" id="zip" name="zip"></input><br></br>
            

                <input class="submit" type="submit" value="Add Card"></input>
            </form> 
        </div>
    </div>
  )
}