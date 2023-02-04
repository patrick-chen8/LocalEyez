import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class AdminEditProfile extends React.Component {

    constructor(props) {
        super(props);
        let promoBool = false;
        if ("true" == sessionStorage.getItem("promo")){
            promoBool = true;
        }
        console.log(sessionStorage.getItem("promo"))
        console.log(promoBool)
        this.state = {
            displayfname: sessionStorage.getItem("fname"),
            displaylname: sessionStorage.getItem("lname"),
            displayphone: sessionStorage.getItem("phone"),
            fname: sessionStorage.getItem("fname"),
            lname: sessionStorage.getItem("lname"),
            pass: "",
            newPass: "",
            newPass2: "",
            phone: sessionStorage.getItem("phone"),
            pAddress: "",
            pCity: "",
            pState: "",
            pZip: "",
            promo: promoBool,
            cardsArray: "",
        };
        //console.log(this.state.promo)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePersonalInfo = this.updatePersonalInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.handlePromo = this.handlePromo.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }
    

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    }

    handlePromo(event) {
        //console.log(!this.state.promo)
        const flip = !this.state.promo;
        //console.log(flip)
        this.setState({promo: flip});
        //console.log(this.state.promo)
    }
    
    async updatePassword(event) {
        event.preventDefault(event);
        
        if (this.state.newPass.localeCompare(this.state.newPass2) != 0) {
            window.alert("Passwords do not match")
            return
          }

        /*if (this.state.newPass != this.state.newPass2) {
            alert("New Passwords do not match!");
            return;
        }*/
        
      // When a post request is sent to the create url, we'll add a new record to the database.
      //const newPerson = { ...form };
      

      
      const userPasswords = {
        email: sessionStorage.getItem("email"),
        password: this.state.pass,
        updatedPassword: this.state.newPass
      }
    
      //console.log("email is: " + sessionStorage.getItem("email"));
      //console.log("loggedIn is: " + sessionStorage.getItem("loggedIn"));

      const response = await fetch("http://localhost:5000/users/updatepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPasswords),
      })
      .catch(error => {
       window.alert(error);
        return;
      });

      if (response.status === 505) {
        alert("Original password is incorrect")
        return
      }

      if (response.status === 500) {
        alert("Error")
        return
      }

      alert("Password updated");

      //window.alert(JSON.stringify(potentialUser));
    
      //setForm({ name: "", position: "", level: "" });
    
      //navigate("/");
    }

    async updatePersonalInfo(event) {
        event.preventDefault(event);
        //console.log(this.state.promo)

        const personalInfo = {
            email: sessionStorage.getItem("email"),
            firstName: this.state.fname,
            lastName: this.state.lname,
            number: this.state.phone,
            promo: this.state.promo
          }
          console.log(this.state.promo);
          const response = await fetch("http://localhost:5000/users/updateinfo", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(personalInfo),
        })
        .catch(error => {
        window.alert(error);
            return;
        });
        const record = await response.json();
        sessionStorage.setItem("fname", this.state.fname)
        sessionStorage.setItem("lname", this.state.lname)
        sessionStorage.setItem("phone", this.state.phone)
        sessionStorage.setItem("promo", this.state.promo)
        window.location.href = "/editprofile";
    }

    logout(event) {
        sessionStorage.clear()
        window.location.href = "/home";
    }

    componentDidMount() {
        this.fetchCards()
    }

    async fetchCards() {
        console.log("In fetchCards")
        const query = {
            userId: sessionStorage.getItem("id")
          }
          console.log(query)
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
        if (!response.ok) {
            console.log("Card fetch error")
            return
        }
        const record = await response.json();
        console.log(record)
        for (let i in record) {
            console.log(record[i].userID)
            console.log(record[i]._id)
        }
        this.setState({cardsArray: record})
    }

    async removeCard(event) {
        event.preventDefault();
        console.log(event.target.value)

        const query = {
            cardId: event.target.value
        }
        console.log(query)
        const response = await fetch("http://localhost:5000/cards/delete", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(query)
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        if (!response.ok) {
            console.log("Card not deleted");
            return;
        }
        const deleted = await response.json();
        console.log(deleted)
        window.alert("Card has been removed")
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div class="createAccount">
                    <h1>Edit Profile</h1>
                        <form onSubmit={this.updatePassword}>
                            <h3>Change Password</h3>
                            <label htmlFor="pass">Enter Password</label><br></br>
                            <input class="textfield" type="password" id="pass" name="pass" value={this.state.pass} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="newPass">Enter New Password</label><br></br>
                            <input class="textfield" type="password" id="newPass" name="newPass" value={this.state.newPass} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="newPass2">Confirm New Password</label><br></br>
                            <input class="textfield" type="password" id="newPass2" name="newPass2" value={this.state.newPass2} onChange={this.handleInputChange}></input><br></br><br></br>

                            <input class="submit" type="submit" value="Submit Changes"></input>
                        </form>

                        <form onSubmit={this.updatePersonalInfo}>
                            <h3>Edit Personal Info</h3>
                            <label htmlFor="fname">First Name: {sessionStorage.getItem("fname")}</label><br></br>
                            <input class="textfield" type="text" id="fname" name="fname" value={this.state.fname} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="lname">Last Name: {sessionStorage.getItem("lname")}</label><br></br>
                            <input class="textfield" type="text" id="lname" name="lname" value={this.state.lname} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="phone">Phone Number: {sessionStorage.getItem("phone")}</label><br></br>
                            <input class="textfield" type="tel" id="phone" name="phone" value={this.state.phone} onChange={this.handleInputChange}></input><br></br><br></br>
                            <label htmlFor="promo">Opt in for Promotion Emails</label>
                            <input class="textfield" type="checkbox" id="promo" name="promo" value={this.state.promo} onChange={this.handlePromo} checked={this.state.promo}></input><br></br><br></br>

                            <input class="submit" type="submit" value="Submit Changes"></input>
                        </form>

                        <div hidden>
                        <form onSubmit={this.updateAddress}>
                            <h3>Edit Personal Address</h3>
                            <label htmlFor="pAddress">Street Address</label><br></br>
                            <input class="textfield" type="text" id="address" name="pAddress" value={this.state.pAddress} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="pCity">City</label><br></br>
                            <input class="textfield" type="text" id="pCity" name="pCity" value={this.state.pCity} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="pState">State</label><br></br>
                            <input class="textfield" type="text" id="pState" name="pState" value={this.state.pState} onChange={this.handleInputChange}></input><br></br>
                            <label htmlFor="pZip">Zipcode</label><br></br>
                            <input class="textfield" type="text" id="pZip" name="pZip" value={this.state.pZip} onChange={this.handleInputChange}></input><br></br><br></br>
                            

                            <input class="submit" type="submit" value="Submit Changes"></input>
                        </form>
                        </div>

                        <button class="logoutButton" onClick={this.logout}>logout</button>
                </div>
                
            </div>
        )
    }
}

export default AdminEditProfile;