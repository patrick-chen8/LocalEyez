/**
 *  Defining the Orders schema for the database
 *  Exports the schema as "Order" so that it may be used in other files
 */

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
 
const OrderSchema = mongoose.Schema({
    email: String,
    date: Date,
    dateReadable: String,
    showingID: ObjectId,
    seats: [String],
    numOfYouth: Number,
    numOfSenior: Number,
    totalPrice: Number
});
 
module.exports = mongoose.model("Order", OrderSchema);