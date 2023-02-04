import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class OrderConfirmation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: JSON.parse(sessionStorage.getItem("currentOrder")),
            showing: sessionStorage.getItem("currentShowing"),
            numAdult: "",
            numYouth: "",
            numSenior: "",
        }
    
        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        
      }

      componentDidMount() {
        console.log(this.state)
        this.setState({numAdult: this.state.order.numOftickets - this.state.order.numOfYouth - this.state.order.numOfSenior})
        this.setState({numYouth: this.state.order.numOfYouth})
        this.setState({numSenior: this.state.order.numOfSenior})
      }

    render() {
        return (
            <div>
                <div class="orderSummary">
                    <h1 class="summaryTitle">Order Confirmation</h1>
                    <div class="bookingDetails">
                        <h6 class="bookingNumber">Order Number: {this.state.order && this.state.order.orderID}</h6>
                        <h6 class="emailVerify">An order confirmation has been sent to {sessionStorage.getItem("email")}</h6>
                        <p>Movie: {this.state.order.movie}</p>
                        <p>Showing: {this.state.order.time}</p>
                        <p>Seats: {this.state.order.orderedSeats}</p>
                        <p>Theater: {this.state.order.theater}</p>
                        {this.state.numAdult > 0 &&  <p>Adult tickets qty: {this.state.numAdult}</p>}
                        {this.state.numYouth > 0 &&  <p>Youth tickets qty: {this.state.numYouth}</p>}
                        {this.state.numSenior > 0 &&  <p>Senior tickets qty: {this.state.numSenior}</p>}
                        <p>Total: {this.state.order.price}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderConfirmation