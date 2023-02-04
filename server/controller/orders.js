/**
 *  Defining the CRUD functions that will be called in routes/orders.js
 */
// importing model
const Order = require("../models/orders");
const Showing = require("../models/showings");
const Movie = require("../models/movies");
const sendEmail = require("../utils/sendEmail");

// export createOrder function
exports.createOrder = async (req, res) => {

    const d = new Date(req.body.date);
    const readable = d.toLocaleString();
    

    let newOrder = new Order({
        email: req.body.email,
        date: req.body.date,
        dateReadable: readable,
        showingID: req.body.showingId,
        seats: req.body.seats,
        numOfYouth: req.body.numOfYouth,
        numOfSenior: req.body.numOfSenior, 
        totalPrice: req.body.totalPrice,
    });    

    try  {
        await newOrder.save();
    } catch (e) {
        console.log(e);
        return res.json(e);
    }

    try {
        // sends confirmation email to user
        const showing = Showing.find({_id: newOrder.showingID}).cursor();
        let s = await showing.next();
        const movie = Movie.find({_id:s.movie}).cursor();
        let m = await movie.next();

        const startTime = s.startReadable;
        const movieName = m.title;
        const theater = s.room;
        
        let orderedSeats = "";
        let tickets = 0;
        for (var i in newOrder.seats) {
            orderedSeats += newOrder.seats[i] + " ";
            tickets++;
        }
        await sendEmail(newOrder.email, `Order Confirmation ${newOrder._id}`, 
            "Order details:" +
            "\nMovie: " + movieName + 
            "\nDate and Time: " + startTime + 
            "\nTheater: " + theater + 
            "\nSeats: " + orderedSeats + 
            "\nPrice: $" + newOrder.totalPrice.toPrecision(4));

        let orderDetails = {
            orderID: newOrder._id,
            movie: movieName,
            time: startTime,
            orderedSeats: orderedSeats,
            theater: theater,
            numOftickets: tickets,
            numOfYouth: newOrder.numOfYouth,
            numOfSenior: newOrder.numOfSenior,
            price: newOrder.totalPrice,
        }
        return res.json(orderDetails);
    } catch(e) {
        console.log(e);
        return res.status(404).json({message: `Email could not be sent to ${newOrder.email}`})
    }
};

// export deleteOrder function
exports.deleteOrder = async (req, res) => {

    try {
        let order = await Order.findByIdAndRemove({ _id: req.body.orderId });
        return res.json(order);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export findCards function
exports.findOrders = async (req, res) => {

    try {
        let orders = Order.find({email: req.body.email}).cursor();
        let orderHistory = [];
        for (let doc = await orders.next(); doc != null; doc = await orders.next()) {
            let showing = Showing.find({_id: doc.showingID}).cursor();
            let s = await showing.next();
            let movie = Movie.find({_id:s.movie}).cursor();
            let m = await movie.next();
        
            let startTime = s.startReadable;
            let movieName = m.title;
            let orderedSeats = "";
            for (var i in doc.seats) {
                orderedSeats += doc.seats[i] + " ";
            }

            let order = {
                orderNumber: doc._id,
                date: doc.dateReadable,
                movie: movieName,
                time: startTime,
                seats: orderedSeats,
                price: doc.totalPrice
            }
            orderHistory.push(order);
        }
        
        return res.json(orderHistory);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};