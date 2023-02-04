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

// this api request will verify the user's account
router.post("/users/verify", userController.verifyAccount);

// this api request will find all the user's in the database
router.post("/users/findusers", userController.findAllUsers);

// this api request will send the user an email with a password reset code
router.post("/users/forgetpassword", userController.forgetPassword);

// this api will verify if the password reset code and user match with one in the database
router.post("/users/verifyforgetpassword", userController.verifyForgetPassword);

// this api will update the user's password in the database after going through the forgot password process
router.post("/users/changeforgetpassword", userController.changeForgetPassword);

module.exports = router;
