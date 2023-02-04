/**
 *  Writing all the different api requests that can be used to modify the users collection
 *  Using the schema that was defined in the models/users file
 */

const express = require("express");
const userController = require("../controller/users");
const router = express.Router();

// This api request will create a new user in the database when a new account is created
router.post("/users/add", userController.createUser);

// this api request will login a user
router.post("/users/email", userController.login);

// this api request will update the password of the user when it is changed in the profile section
router.post("/users/updatepass", userController.updatePassword);

// this api request will update the user's info when it is changed in the profile section
router.post("/users/updateinfo", userController.updateInfo);

// this api request will find all the user's in the database
router.post("/users/findusers", userController.findAllUsers);

module.exports = router;
