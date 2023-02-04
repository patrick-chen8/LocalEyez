import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            trailer1: "",
            trailer2: "",
            trailer3: "",
            currentMoviesArray: "",
            futureMoviesArray: "",
            currentTotal: 0,
            futureTotal: 0,
            comingSoonPointer: 0,
            nowShowingPointer: 0,
            now1Id: "",
            now2Id: "",
            now3Id: "",
            now4Id: "",
            now5Id: "",
            future1Id: "",
            future2Id: "",
            future3Id: "",
            future4Id: "",
            future5Id: "",
            now1Pic: "",
            now2Pic: "",
            now3Pic: "",
            now4Pic: "",
            now5Pic: "",
            future1Pic: "",
            future2Pic: "",
            future3Pic: "",
            future4Pic: "",
            future5Pic: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async gatherMovies() {
        console.log("gatherMovie function")
        const response = await fetch("http://localhost:5000/movies/find30current", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        const currentMovies = await response.json();
        const testArray = currentMovies.map((movie) => (
            movie = movie
            )
      );

        //console.log(currentMovies)
        //console.log("currentMovies: " + currentMovies)
        
        this.setState({currentMoviesArray: currentMovies});
        
        //console.log(this.state.currentMoviesArray)

        const response2 = await fetch("http://localhost:5000/movies/find30future", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        const futureMovies = await response2.json();

        this.setState({futureMoviesArray: futureMovies})

        this.setStates();
    }

    setStates() {

        const currentArray = this.state.currentMoviesArray;
        const futureArray = this.state.futureMoviesArray;

        /*console.log("in setStates")
        console.log(this.state.currentMoviesArray)
        console.log(array)*/
        console.log(this.state)

        for (let x in currentArray) {
            //console.log(x)
            if (x==0) {
                this.setState({trailer1: currentArray[x].trailer})
                this.setState({now1Pic: currentArray[x].picture})
                this.setState({now1Id: currentArray[x]._id})
            }   
            if (x==1) {
                this.setState({trailer2: currentArray[x].trailer})
                this.setState({now2Pic: currentArray[x].picture})
                this.setState({now2Id: currentArray[x]._id})
            }
            if (x==2) {
                this.setState({trailer3: currentArray[x].trailer})
                this.setState({now3Pic: currentArray[x].picture})
                this.setState({now3Id: currentArray[x]._id})
            }
            if (x==3) {
                this.setState({now4Pic: currentArray[x].picture})
                this.setState({now4Id: currentArray[x]._id})
            }
            if (x==4) {
                this.setState({now5Pic: currentArray[x].picture})
                this.setState({now5Id: currentArray[x]._id})
            }

        }

        for (let x in futureArray) {
            //console.log(x)
            if (x==0) {
                this.setState({future1Pic: futureArray[x].picture})
                this.setState({future1Id: futureArray[x]._id})
            }   
            if (x==1) {
                this.setState({future2Pic: futureArray[x].picture})
                this.setState({future2Id: futureArray[x]._id})
            }
            if (x==2) {
                this.setState({future3Pic: futureArray[x].picture})
                this.setState({future3Id: futureArray[x]._id})
            }
            if (x==3) {
                this.setState({future4Pic: futureArray[x].picture})
                this.setState({future4Id: futureArray[x]._id})
            }
            if (x==4) {
                this.setState({future5Pic: futureArray[x].picture})
                this.setState({future5Id: futureArray[x]._id})
            }

        }

       // console.log(this.state)
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    }

    componentDidMount() {
        this.gatherMovies();
        //this.setStates();
    }

    componentWillUnmount() {

    }

    handleFutureNext(event) {

    }

    handleNowNext(event) {

    }

    render() {

        return (
            <div>
                <div class="homeSection">
                    <h2>Featured Trailers</h2>
                    <div class="trailerStrip">
                        <button hidden class="arrowButton">&lt</button>
                        <iframe class="homeTrailer" src={this.state.trailer1} allowFullScreen></iframe>
                        <iframe class="homeTrailer" src={this.state.trailer2} allowFullScreen></iframe>
                        <iframe class="homeTrailer" src={this.state.trailer3} allowFullScreen></iframe>
                        <button hidden class="arrowButton">&gt</button>
                    </div>
                </div>
                <div class="homeSection">
                    <h2>Now Showing</h2>
                    <div class="movieStrip">
                        <button hidden class="arrowButton">Previous</button>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.now1Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.now1Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.now1Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.now2Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.now2Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.now2Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.now3Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.now3Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.now3Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.now4Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.now4Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.now4Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.now5Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.now5Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.now5Id}>View Details</a>
                        </div>
                    <button hidden class="arrowButton">Next</button>
                    </div>
                </div>
                <div class="homeSection">
                    <h2>Coming Soon</h2>
                    <div class="movieStrip">
                        <button hidden class="arrowButton">Previous</button>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.future1Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.future1Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.future1Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.future2Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.future2Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.future2Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.future3Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.future3Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.future3Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.future4Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.future4Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.future4Id}>View Details</a>
                        </div>
                        <div class="movieElement">
                            <img class="promoHome" src={this.state.future5Pic}></img>
                            <a href={"/admin/schedulemovie/" + this.state.future5Id}>Schedule Movie</a>
                            <a href={"/admin/movie/" + this.state.future5Id}>View Details</a>
                        </div>
                        <button hidden class="arrowButton" onClick={this.handleFutureNext}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;