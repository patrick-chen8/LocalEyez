import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';

export default function ScheduleMovie() {

    const {id} = useParams()
    
    const [fetched, setFetched] = useState(false);
    const [movie, setMovie] = useState("");
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [room, setRoom] = useState("A");
    const [newAvailability, setNewAvailability] = useState("Not Available");

    useEffect(() => {
        //console.log(Date())
        console.log("In useEffect")
        if (!fetched) {
            const fetchData = async () => {
                const movieQuery = {
                    movieId: id
                }
                console.log(movieQuery)
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
                }


            }
        
            fetchData()
        }        
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(date)
        console.log(start)
        console.log(end)
        const startDate = date + "T" + start;
        const endDate = date + "T" + end;
        console.log(startDate)
        console.log(endDate)

        const newShowing = {
            movie: movie,
            start: startDate,
            end: endDate,
            room: room,
        }
        console.log(newShowing);
      
      
        const response = await fetch("http://localhost:5000/showings/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newShowing),
        })
        .catch(error => {
         window.alert(error);
          return;
        });

        if (response.ok) {
            console.log(response)
            window.alert("Movie has been scheduled")
            return
        }
        if (!response.ok) {
            window.alert("Time conflict! Enter another time.")
        }
        //sessionStorage.setItem("")
    }

    async function handleAvailabilitySubmit(event) {
        event.preventDefault()

        const query = {
            availability: newAvailability,
            movieId: movie,
        }

        const response = await fetch("http://localhost:5000/movies/availability", {
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



        console.log(response)
        window.location.reload(true);
        //sessionStorage.setItem("")

    }

    function handleDateChange(event) {
        setDate(event.target.value)
    }

    function handleStartChange(event) {
        console.log(start)
        console.log(event.target.value)
        setStart(event.target.value)
    }

    function handleEndChange(event) {
        setEnd(event.target.value)
    }

    function handleAvailabilityChange(event) {
        setNewAvailability(event.target.value)
    }

    function handleRoomChange(event) {
        setRoom(event.target.value)
    }
        return (
            <div>
                {movie && <div class="manageMoviesDetails">
                    <h4>Schedule "{movie.title}"</h4>
                    <form onSubmit={handleAvailabilitySubmit}>
                    <p>This movie is: {movie.availability}</p>
                    <label htmlFor="availability">Set Availability: </label><br></br>
                    <select class="textfield" name="availability" id="availability" value={newAvailability} onChange={handleAvailabilityChange}>
                        <option value="Not Available">Not Available</option>
                        <option value="Currently Showing">Currently Showing</option>
                        <option value="Coming Soon">Coming Soon</option>
                    </select><br></br>
                    <input class="submit" type="submit" value="Update Availability"></input>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="date">Enter Date: </label><br></br>
                        <input class="textfield" type="date" id="date" name="date" min="2023-12-07" value={date} onChange={handleDateChange}></input><br></br>

                        <label htmlFor="startTime">Enter Start Time: </label><br></br>
                        <input class="textfield" type="time" id="startTime" name="startTime" value={start} onChange={handleStartChange}></input><br></br>

                        <label htmlFor="endTime">Enter End Time: </label><br></br>
                        <input class="textfield" type="time" id="endTime" name="endTime" value={end} onChange={handleEndChange}></input><br></br>
                    
                        <label htmlFor="showroom">Select Showroom: </label><br></br>
                        <select class="textfield" name="showroom" id="showroom" value={room} onChange={handleRoomChange}>
                        <option value="A">Showroom A</option>
                        <option value="B">Showroom B</option>
                        </select><br></br>
                        <input class="submit" type="submit" value="Create Showing"></input>
                    </form>
                </div>}
                </div>
        )
    
}