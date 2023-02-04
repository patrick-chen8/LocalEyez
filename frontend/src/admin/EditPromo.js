import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class EditPromo extends React.Component {

    constructor(props) {
        super(props);

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
            <div class="manageUsers">
                <h1 class="pageTitle">Edit Existing Promotion</h1>
                <div class="manageUsersDetails">
                    <div class="addPromo">
                        <form>
                            <label>Promotion Code: Samurai24</label><br></br>
                            <label>Expiration Date: 10-16-2022</label><br></br>
                            <label>Discount Percentage: 10%</label><br></br><br></br>
                            <label htmlFor="amount">Modify Discount Percentage:</label><br></br>
                            <input class="textfield" type="text" id="amount" name="amount"></input><br></br>

                            <label htmlFor="date">Change Expiration Date: </label><br></br>
                            <input class="textfield" type="text" id="date" name="date"></input><br></br>
                    
                            <input type="submit" value="Submit"></input><br></br>
                            <a>Delete Promotion</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPromo;