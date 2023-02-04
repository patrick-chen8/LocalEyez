/**
 *  Writing all the different api requests that can be used to return location data
 */

const express = require("express");
const locationController = require("../controller/locationData");
const router = express.Router();

// This fetch request will return the JSON data of all the locations
router.post("/location", locationController.findLocations)

module.exports = router;