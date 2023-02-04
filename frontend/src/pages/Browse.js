import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

export default function Browse() {
  return (
    <div>
        <div class="browseBar">
            <div class="browseBarLeft">
                <h2>Filter by:</h2>
                <label for="genre">Genre</label>
                <select class="textfield" name="genre" id="genre">
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Horror">Horror</option>
                </select>
                <label for="Show Date">Show Date</label>
                <input class="textfield" name="showDate" id="showDate" type="date"></input>
                <label for="ageRating">Age Rating</label>
                <select class="textfield" name="ageRating" id="ageRating">
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                </select>
            </div>
            <div class="browseBarRight">
                <h2 for="sort">Sort by:</h2>
                <select class="textfield" name="sort" id="sort">
                    <option value="Genre">Genre</option>
                    <option value="Show Date">Show Date</option>
                    <option value="Reviews">Reviews</option>
                </select>
                <label for="Show Date">Show Date</label>
                <input class="textfield" name="showDate" id="showDate" type="date"></input>
            </div>
        </div>
        <div class="movieList">
            <div class="movieResult">
                <img class="promoPoster" src={require("../images/solo.jpg")}></img>
                <div class="resultInfo">
                    <h2>Solo</h2>
                    <p>Rated: PG-13</p>
                    <a>View Movie Details</a>
                    <a>Book Tickets</a> 
                </div>
            </div>
            <div class="movieResult">
                <img class="promoPoster" src="../images/womanKing.jpg"></img>
                <div class="resultInfo">
                    <h2>The Woman King</h2>
                    <p>Rated: PG-13</p>
                    <a>View Movie Details</a>
                    <a>Book Tickets</a> 
                </div>
            </div>
            <div class="movieResult">
                <img class="promoPoster" src="../images/weathering.jpg"></img>
                <div class="resultInfo">
                    <h2>Weathering With You</h2>
                    <p>Rated: PG-13</p>
                    <a>View Movie Details</a>
                    <a>Book Tickets</a> 
                </div>
            </div>
        </div>
    </div>
  )
}