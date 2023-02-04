import React from 'react';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            location: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {    
        this.setState({
            query: event.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        window.alert("Search was entered");

        const search = {
            query: this.state.query
        }

        const response = await fetch("http://localhost:5000/location", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(search),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        
        const record = await response.json();
        console.log(record)
        this.setState({
            location: JSON.stringify(record)
        });
        this.createSession();
    }

    createSession(event) {
        sessionStorage.setItem("location", this.state.location)
        console.log(sessionStorage.getItem("location"))
    }

    render() {
        return (
                <form class="form" onSubmit={this.handleSubmit}>
                    Location:
                    <input class="searchBar" type="search"  id="search" name="search" value={this.state.query} onChange={this.handleInputChange}></input>
                    <button class="submit" type="submit" value="Search">Search</button>
                </form>
        );
    }
}

export default Search;