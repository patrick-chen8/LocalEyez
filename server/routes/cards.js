/**
*  Receiving all the different api requests that can be used to modify the cards collection
*  Using the controller defind methods from controller/cards
*/

const express = require("express");
const cardsController = require("../controller/cards");
const router = express.Router();
 
// This request will add a new card to the cards collection
router.post("/cards/add", cardsController.createCard);

// This request will delete an existing card
router.post("/cards/delete", cardsController.deleteCard);

// This request will find all cards that are associated with a userId
router.post("/cards/find", cardsController.findCards);
 
module.exports = router;