/**
 *  Defining the CRUD functions that will be called in routes/showings.js
 */
// importing model
const { findOneAndUpdate } = require("../models/showings");
const Showing = require("../models/showings");

// export createShowing function
exports.createShowing = async (req, res) => {
    const seatsArray = []
    for (var i = 0; i < 100; i++) {
        seatsArray[i] = "available";
    }

    let room = req.body.room;
    let start = req.body.start;
    let end = req.body.end;
    const startD = new Date(start);
    const endD = new Date(end);

    try {
        const cursor = Showing.find({room: room}).cursor();

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            console.log(startD);
            console.log(endD);
            console.log("start: " + doc.start);
            console.log("end: " + doc.end);
            if ((startD >= doc.start && startD <= doc.end) || (endD >= doc.start && endD <= doc.end) || (startD <= doc.start && endD >= doc.end)){
                console.log("error")
                return res.status(400).json();
            }
        }
    } catch (e) {
        console.log(e);
        return res.json(e);
    }

    //console.log("Start date: " + req.body.start)
    const startDate = new Date(req.body.start)
    //console.log(startDate);
    const readable = startDate.toLocaleString()
    console.log(readable);

    let newShowing = new Showing({
        movie: req.body.movie,
        start: req.body.start,
        end: req.body.end,
        seats: seatsArray,
        room: req.body.room,
        startReadable: readable
    });    

    try  {
        await newShowing.save();
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
    return res.json(newShowing);
};

// export editShowing
exports.editShowing = async (req, res) => {
    let showingID = req.body.showingID;
    let updatedShowing = {
        movie: req.body.movie,
        start: req.body.start,
        end: req.body.end,
        seats: req.body.seats,
        room: req.body.room
    }

    try  {
        let showing = Showing.findOneAndUpdate({_id: showingID}, updatedShowing);
        return res.json(showing);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export deleteShowing function
exports.deleteShowing = async (req, res) => {
    let showingID = req.body.showingID;

    try {
        let showing = await Showing.findOneAndRemove({_id: showingID});
        return res.json({ message: "Showing Deleted" });
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export a find showings by movie id function
exports.findShowings = async (req, res) => {
    let movieID = req.body.movieId;
    
    try {
        let showings = await Showing.find({ movie: movieID });
        //console.log(showings)
        if (showings.length == 0) {
            return res.status(500).json(showings);
        }
        return res.json(showings);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export a find showings by showing id function
exports.findShowingsById = async (req, res) => {
    try {
        let showing = await Showing.find({ _id: req.body.showingID });
        return res.json(showing);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

// export a method that updates the available seats based off of a customer's order
exports.updateShowingSeats = async (req, res) => {
    console.log("In updateShowingSeats")
    console.log(req.body.seats)
    let seatUpdate = {
        seats: req.body.seats
    };

    try {
        let showing = await Showing.findOneAndUpdate({_id: req.body._id}, seatUpdate);
        return res.json(showing);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
}
