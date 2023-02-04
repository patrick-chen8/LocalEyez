/**
 *  Defining the movie schema for the database
 *  When each movie is created all of these keys will be filled with some value
 *  Exports the schema as "Movie" so that it may be used in other files
 */

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
 
 const MovieSchema = mongoose.Schema({
    title: String,
    category: [String],
    ageRating: String,
    director: String,
    producer: [String],
    cast: [String],
    synopsis: String,
    picture: String,
    trailer: String,
    availability: String, // now playing, coming soon, or (unavailable) or deleted
    showings: [ObjectId],
    runtime: Number
 });

 module.exports = mongoose.model("Movie", MovieSchema);