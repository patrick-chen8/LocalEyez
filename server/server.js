/**
 *  Creating a server that is hosted at localhost: 5000 that connects to the mongoDB via mongoose
 *  Establish the routes that the server will use in order to handle CRUD requests
 */
require("dotenv").config({ path: "./config.env" });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

// connecting the to the database using mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

// upon connection, console prints that it has successfully connected to mongoDB
database.once('connected', () => {
    console.log('Successfully connected to MongoDB');
});

// define the routes that the app will use for requests along with cors and express middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));


// once connection is established and server has been hosted at port 5000, set app to listen at the port
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});
