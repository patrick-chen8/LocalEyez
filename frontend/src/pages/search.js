import React from 'react';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: ""};
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(e) {
        e.preventDefault();
        window.alert("Search was entered");

        const response = await fetch("http://localhost:5000/location", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.input),
        })
        .catch(error => {
            window.alert(error);
            return;
        });


        const record = await response.json();
        console.log(record);
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <label>
                    Location:
                    <input type="text" id="input" name="input"/>
                </label>
                <input className="submit" type="submit" value="Search"/>

                <h2>Updated: {this.state.input}</h2>
            </form>
        );
    }
}

export default Search;