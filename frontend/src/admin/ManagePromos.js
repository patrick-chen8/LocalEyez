import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class ManagePromos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            discount: 0,
            descriptor: "",
            promosArray: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewPromo = this.handleNewPromo.bind(this);
        this.handleEditPromo = this.handleEditPromo.bind(this);
        this.sendPromo = this.sendPromo.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    }

    async handleNewPromo(e) {
        e.preventDefault();

        const newPromo = {
            descriptor: this.state.descriptor,
            discount: this.state.discount,
            code: this.state.code,
        }

        console.log(this.state)
        const response = await fetch("http://localhost:5000/addpromo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromo),
          })
          .catch(error => {
           window.alert(error);
            return;
          });

        console.log(response);

        //const currentPromosArray = await response.json();

        //this.setState({promosArray: currentPromosArray})

        window.location.reload(true);
    }



    async handleEditPromo(e) {
        e.preventDefault();
        
    }

    componentDidMount() {
        this.gatherPromos();
    }

    componentWillUnmount() {

    }

    async gatherPromos() {

        console.log("gatherPromos function")

        const response = await fetch("http://localhost:5000/findpromos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        const currentPromos = await response.json();
        

        console.log(currentPromos)
        //console.log("currentMovies: " + currentMovies)
        
        this.setState({promosArray: currentPromos});
        
        console.log(this.state)
    }

    async sendPromo(promoId) {
        console.log("sendPromo function")

        console.log("Promo id = " + promoId)

        const promoToSend = {
            id: promoId 
        }

        const response = await fetch("http://localhost:5000/sendpromo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(promoToSend),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        window.location.reload(true);
    }

    goToEdit(event) {
        
    }

    render() {
        return (
            <div class="manageUsers">
                <h1 class="pageTitle">Manage Promotions</h1>
                <div class="manageUsersDetails">
                    <div class="addPromo">
                        <h4> Add New Promotion</h4>
                        <form onSubmit={this.handleNewPromo}>
                            <label htmlFor="code">Enter New Promotion Code:</label><br></br>
                            <input class="textfield" type="text" id="code" name="code" value={this.state.code} onChange={this.handleInputChange}></input><br></br>
                            
                            <label htmlFor="discount">Enter Discount Percentage:</label><br></br>
                            <input class="textfield" type="number" id="discount" name="discount" min="1" max="100" value={this.state.discount} onChange={this.handleInputChange}></input><br></br>

                            <label htmlFor="descriptor">Enter New Promotion Descriptor:</label><br></br>
                            <input class="textfield" type="text" id="descriptor" name="descriptor" value={this.state.descriptor} onChange={this.handleInputChange}></input><br></br>
                            
                            <label hidden htmlFor="pDate">Enter New Promotion Expiration:</label>
                            <input hidden class="textfield" type="text" id="pDate" name="pDate" value={this.state.newPromoDate} onChange={this.handleInputChange}></input>
                    
                            <input type="submit" value="Submit"></input><br></br>
                        </form>
                    </div>
                    <div hidden class="editPromo">
                        <h4>Edit an Existing Promotion</h4>
                        <form onSubmit={this.handleEditPromo}>
                        <label htmlFor="pSearch">Search Promotion Code:</label><br></br>
                        <input class="textfield" type="search" id="pSearch" name="pSearch" ></input><br></br>
                        <input type="submit" value="Search"></input>
                        </form>
                    </div>
                    <div class="existingPromos">
                        <h4>Existing Promotions</h4>

                        {this.state.promosArray && this.state.promosArray.map((result) => (
                            
                            <div class="promoResult" key={result._id}>
                                <p>{result.code}</p>
                                <p>{result.discount}</p>
                                <p>{result.descriptor}</p>
                                {result.sentEmail && <p>Email has been sent</p>}
                                {!result.sentEmail && <button onClick={(e) => this.sendPromo(result._id, e)}>Send Out</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ManagePromos;