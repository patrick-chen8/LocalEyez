import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArray: "",
        }
    }

    componentDidMount() {
        this.gatherUsers()
    }

    componentWillUnmount() {

    }

    async gatherUsers() {
        // Find all users fetch request
        console.log("gatherUsers function")

        const response = await fetch("http://localhost:5000/users/findusers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        const currentUsers = await response.json();
        if (response.ok) {
            console.log(currentUsers)
        
            this.setState({usersArray: currentUsers});
            
            console.log(this.state)
        }
        
    }

    render() {
        return (
            <div class="manageUsers">
                <h1 class="pageTitle">Manage Users</h1>
                <h2>All Users</h2>
                {this.state.usersArray && this.state.usersArray.map((result) => (
                            <div class="promoResult" key={result._id}>
                                <p>{result.firstName} {result.lastName}</p>
                            </div>
                    ))}
            </div>
        )
    }
}

export default ManageUsers;