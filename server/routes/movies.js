/**
 *  Writing all the different api requests that can be used to modify the movies collection
 *  Using the controller and defined methods in controllers/movies
 */

const express = require("express");
const movieController = require("../controller/movies");
const router = express.Router();
 
// This request will add a new movie to the movies
router.post("/movies/add", movieController.addMovie);

// This request will edit a movie in the movies collection
router.post("/movies/edit", movieController.editMovie);

// This request will find the movies that are currently showing
router.post("/movies/findcurrent", movieController.findCurrentMovies);

// This request will find the movies that are coming soon
router.post("/movies/findfuture", movieController.findFutureMovies);

router.post("/movies/find30current", movieController.find30CurrentMovies);
 
router.post("/movies/find30future", movieController.find30FutureMovies);

router.post("/movies/findMovie", movieController.findById);
 
router.post("/movies/availability", movieController.updateAvailability);

module.exports = router;