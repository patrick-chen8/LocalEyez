/**
*  Receiving all the different api requests that can be used to modify the orders collection
*  Using the controller defind methods from controller/orders
*/

const express = require("express");
const ordersController = require("../controller/orders");
const router = express.Router();
 
// This request will add a new order to the orders collection
router.post("/orders/add", ordersController.createOrder);

// This request will delete an existing order
router.post("/orders/delete", ordersController.deleteOrder);

// This request will find all orders that are associated with an email
router.post("/orders/find", ordersController.findOrders);
 
module.exports = router;