import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

export default function Movie() {
    const {id} = useParams()
    
    const [fetched, setFetched] = useState(false);
    const [showingsFetched, setShowingsFetched] = useState(false);
    const [movie, setMovie] = useState(null);
    const [showings, setShowings] = useState(null)
    const [movieFound, setMovieFound] = useState(true)
    const [showingsFound, setShowingsFound] = useState(true)



    useEffect(() => {
        if (!fetched) {
            const fetchData = async () => {
                const movieQuery= {
                    movieId: id
                }
                const response = await fetch("http://localhost:5000/movies/findMovie", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(movieQuery),
                })
                .catch(error => {
                window.alert(error);
                    return;
                });
                if (response.ok) {
                    const movieObject = await response.json()
                    console.log(movieObject)
                    setMovie(movieObject)
                    setFetched(true)
                    window.sessionStorage.setItem("currentMovie", JSON.stringify(movieObject))
                } else {
                    window.location.href = "/home"

                }


            }
        
            fetchData()
        }        

        if (!showingsFetched) {
            const showingsFetchData = async () => {
                const movieQuery2 = {
                    movieId: id
                }
                const response = await fetch("http://localhost:5000/showings/findall", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(movieQuery2),
                })
                .catch(error => {
                window.alert(error);
                    return;
                });
                console.log(response)
                if (response.ok) {
                    const showingsObject = await response.json()
                    console.log(showingsObject)
                    setShowings(showingsObject)
                    setShowingsFetched(true)
                } else {
                    setShowingsFound(false)
                }
                

            }
        
            showingsFetchData()
        }        
    }, [])


    function handleBook(showing, e) {
        e.preventDefault()
        console.log("Showing: " + showing)
        console.log("Showing: " + showing._id)
        console.log("Showing: " + showing.movie)

        window.sessionStorage.setItem("currentShowing", JSON.stringify(showing))

        window.location.href = "/seat/" + showing._id
    }
    

    return (
        <div>
            {movie && <div class="movieDetails" key={movie._id}>
                <h1 class="detailsTitle">{movie.title}</h1>
                <div class="detailsTop">
                    <img class="detailsPoster" src={movie.picture}></img>
                    <iframe class="detailsTrailer" src={movie.trailer} allowFullScreen></iframe>
                </div>
                <div class="detailsBottom">
                    <div class="infoStrip">
                        <h3 class="detailHeading">Category: {movie.category}</h3>

                        <h3 class="detailHeading">Rated: {movie.ageRating}</h3>
                        <h3 class="detailHeading">Director: {movie.director}</h3>
                        <h3 class="detailHeading">Producer: {movie.producer}</h3>
                        <h3 class="detailHeading">Cast: {movie.cast}</h3>
                        <h3 hidden class="detailHeading">Reviews: 6.9/10</h3>
                    </div>
                    <h3 class="detailHeading">Synopsis: </h3>
                    <p class="synopsis">
                        {movie.synopsis}
                    </p><br></br><br></br>
                    <h3 class="detailHeading">Showtimes:</h3>
                        {showings && showings.map((showing) => (
                            <div class="showing" key={showing._id}>
                                <h4>Showing</h4>
                                <p>Time: {showing.startReadable}</p>
                                <p>Showroom: {showing.room}</p>
                                <button onClick={(e) => handleBook(showing, e)}>Book This Showing</button><br></br><br></br>
                                {/*<a href={"/seat/" + showing._id}>Book This Showing</a><br></br><br></br>*/}
                            </div>
                        ))
                        
                        }
                        {!showingsFound && 
                        <p>No available showtimes</p>}
                    <a hidden href="/book">Book Tickets</a>
                </div>
            </div>
            }
            {!movieFound && 
                        <p>Movie Does Not Exist</p>}
        </div>
    )
}
