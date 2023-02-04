import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleQuery: "",
            genreQuery: "",
            availability: "",
            results: "",
            noResult: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const query = {
            title: this.state.titleQuery,
            category: this.state.genreQuery,
            availability: this.state.availability,

        }

        console.log(this.state)
        const response = await fetch("http://localhost:5000/search", {
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

        console.log(response);

        const queryResults = await response.json();

        this.setState({results: queryResults})

        console.log(queryResults)
        if (queryResults.length == 0) {
            this.setState({noResult: true})
        } else {
            this.setState({noResult: false})
        }
    }

    componentDidMount() {
        this.defaultSearch();
    }

    componentWillUnmount() {

    }

    async defaultSearch() {
        const query = {
            title: this.state.titleQuery,
            category: this.state.genreQuery,
            availability: this.state.availability,

        }

        //console.log(this.state)
        const response = await fetch("http://localhost:5000/search", {
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

        //console.log(response);

        const queryResults = await response.json();

        this.setState({results: queryResults})
        if (queryResults.length == 0) {
            this.setState({noResult: true})
        } else {
            this.setState({noResult: false})
        }

        //console.log(queryResults)
    }


    render() {
      return (
            <div>
                <div class="search">
                    <div class="searchLine">
                        <form class="form" onSubmit={this.handleSubmit}>
                            <input class="searchBar" type="search"  id="titleQuery" name="titleQuery" placeholder="Enter a Movie Title" value={this.state.titleQuery} onChange={this.handleInputChange}></input>
                            <input class="searchBar" type="search" id="genreQuery" name="genreQuery" placeholder="Enter a Movie Genre" value={this.state.genreQuery} onChange={this.handleInputChange}></input>
                            <label htmlFor="ctype">Select Filter</label>
                            <select class="textfield" name="availability" id="availability" value={this.state.availability} onChange={this.handleInputChange}>
                                <option value="All">All</option>
                                <option value="Currently Showing">Currently Showing</option>
                                <option value="Coming Soon">Coming Soon</option>
                            </select>
                            <input class="submit" type="submit" value="Search"></input>
                        </form>
                    </div>
                </div>
                <div class="movieList">
                {this.state.results && this.state.results.map((result) => (
                    <div class="movieResult" key={result._id}>
                        <img class="promoPoster" src={result.picture}></img>
                        <iframe class="homeTrailer" src={result.trailer} allowFullScreen></iframe>
                        <div class="resultInfo" key={result._id}>
                            <h2>{result.title}</h2>
                            <p>Rated: {result.ageRating}</p>
                            <a href={"/movie/" + result._id}>View Movie Details</a>
                        </div>
                    </div>
                ))}
                {this.state.noResult && <h2>Movie does not exist. Please try another.</h2>}
                </div>
            </div>
        )
    }
}
export default Search;