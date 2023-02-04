const express = require("express");
const promoController = require("../controller/promo");
const router = express.Router();

// This request will add a new movie to the movies database
router.post("/addpromo", promoController.addPromo);

router.post("/sendpromo", promoController.sendPromo);

router.post("/findpromos", promoController.findPromos);

router.post("/checkpromo", promoController.checkPromo);

module.exports = router;