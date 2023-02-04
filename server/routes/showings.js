/**
*  Receiving all the different api requests that can be used to modify the showings collection
*  Using the controller defind methods from controller/showings
*/

const express = require("express");
const showingsController = require("../controller/showings");
const router = express.Router();
 
// This request will add a new showing to the showings collection
router.post("/showings/add", showingsController.createShowing);

// This request will edit an existing showing
router.post("/showings/edit", showingsController.editShowing);

// This request will delete an existing showing
router.post("/showings/delete", showingsController.deleteShowing);

// This request will find all showings associated with a movie ID
router.post("/showings/findall", showingsController.findShowings);

// This request will update the seats array for a showing based off of customer orders
router.post("/showings/updateseats", showingsController.updateShowingSeats);

module.exports = router;