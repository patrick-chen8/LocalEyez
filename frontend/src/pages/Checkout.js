import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenCard: "",
            cardsArray: "",
            promo: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.chooseCard = this.chooseCard.bind(this)
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
      }

    componentDidMount() {
        this.fetchCards()
    }

    async fetchCards() {
        const query = {
            userId: sessionStorage.getItem("id")
        }
        
          
        const response = await fetch("http://localhost:5000/cards/find", {
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
          //console.log(response.ok);
          //console.log(response);
          const record = await response.json();
          //console.log(record)
          this.setState({cardsArray: record})
    }


    async handleContinue(event) {
        event.preventDefault()
        if (!this.state.chosenCard) {
            window.alert("Please select or enter a payment card")
            return
        }

        const cartObject = JSON.parse(sessionStorage.getItem("cart"))
        let tempSeats = [];
        for (var i in cartObject.cart.tickets) {
            tempSeats [i] = cartObject.cart.tickets[i].identifier
        }
        

        let a = 0
        let y = 0
        let e = 0

        for (let i in cartObject.cart.tickets) {
            switch(cartObject.cart.tickets[i].type) {
                case "adult":
                    a++
                    break
                case "youth":
                    y++
                    break
                case "elder":
                    e++
                    break
            }
        }

        const idObject = JSON.parse(sessionStorage.getItem("currentShowing"))._id;

        const newOrder = {
            email: sessionStorage.getItem("email"),
            showingId: idObject,
            seats: tempSeats,
            numOfYouth: y,
            numOfSenior: e,
            totalPrice: sessionStorage.getItem("total"),
            date: new Date(),
        }

        //console.log(newOrder);

        const response = await fetch("http://localhost:5000/orders/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(newOrder),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        const record = await response.json();
        //console.log(record)
        sessionStorage.setItem("currentOrder", JSON.stringify(record))

        if (!response.ok) {
            window.alert("Response error")
            return
        }


        //console.log(sessionStorage.getItem("seatArray"))
        //console.log(JSON.parse(sessionStorage.getItem("seatArray")))
        const seatQuery = {
            seats: JSON.parse(sessionStorage.getItem("seatArray")),
            _id: JSON.parse(sessionStorage.getItem("currentShowing"))._id
        }



        const response2 = await fetch("http://localhost:5000/showings/updateseats", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(seatQuery),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        if (!response2.ok) {
            window.alert("Response2 error")
            return
        }
        //console.log(response)
        //const record2 = await response.json();
        window.location.href = "/orderconfirmation"
    }

    addCard(event) {
        event.preventDefault()
        window.location.href="/addcard"
    }

    chooseCard(event) {
        event.preventDefault()
        const card = this.state.cardsArray[event.target.value]
        //console.log(card)
        this.setState({chosenCard: card})
        //console.log(this.state.chosenCard)
    }

    render() {
        return (
            <div>
                <div class="checkout">
                    <h1 class="checkoutTitle">Checkout</h1>
                    <div class="checkoutPay">
                        {this.state.chosenCard && 
                        <div key={this.state.chosenCard._id}>
                            <h2 class="checkoutPayTitle">Selected Payment Card</h2>
                            <br></br>
                            <p>{this.state.chosenCard.type}</p>
                            <p>**** **** **** {this.state.chosenCard.cardLastFour}</p>
                            <p>{this.state.chosenCard.address}</p>
                            <br></br>
                            <hr></hr>
                            <br></br>
                        </div>}
                        <h2>Saved Cards</h2>
                        {this.state.cardsArray && this.state.cardsArray.map((card, index) => (
                            <div key={card._id}>
                                <p>{card.type}</p>
                                <p>**** **** **** {card.cardLastFour}</p>
                                <p>{card.address}</p>
                                <button onClick={this.chooseCard} value={index}>Select this card</button>
                                <br></br>
                            </div>
                            )) 
                        }
                    </div>
                    <button onClick={this.addCard}>Add new card</button>
                    <button onClick={this.handleContinue}>Place Order</button>
                    <a>Cancel Transaction</a>
                </div>
            </div>
        )
    }
}

export default Checkout