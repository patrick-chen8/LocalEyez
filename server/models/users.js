/**
 *  Defining the user schema for the database
 *  When each user is created all of these keys will be filled with some value
 *  Exports the schema as "User" so that it may be used in other files
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    number: String,
    status: String,
    rememberMe: Boolean,
    promo: Boolean,
    admin: Boolean,
});

// utilizing bcrypt to hash the user password before it is stored in the database
UserSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
                return next(hashError)
            }

            user.password = hash
            next()
            })
        }
        })
    } else {
        return next()
    }
});

// creating a function that can compare a user input vs a hashed password
UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

module.exports = mongoose.model("User", UserSchema);