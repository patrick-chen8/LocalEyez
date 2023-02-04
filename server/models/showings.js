/**
 *  Defining the showings model
 *  Exports the schema as "Showings" so that it may be used in other files
 */

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
 
 const ShowingsSchema = mongoose.Schema({
    movie: ObjectId,
    start: Date, // contains time
    end: Date,
    seats: [String],
    room: String,
    startReadable: String,
 });

 module.exports = mongoose.model("Showing", ShowingsSchema);