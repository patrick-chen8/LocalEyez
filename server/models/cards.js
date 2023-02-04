/**
 *  Defining the cards schema for the database
 *  Exports the schema as "Card" so that it may be used in other files
 */

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
 
const CardSchema = mongoose.Schema({
    userID: ObjectId,
    cardNumber: String,
    cardLastFour: String,
    expDate: String,
    securityCode: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    type: String,
    vect: Buffer,
    key: Buffer
});



// utilizing bcrypt to hash the card number, security code, and address (including city state and zip)
CardSchema.pre("save", function (next) {
    const card = this;
    if (this.isNew) {
        const initVector = card.vect;
        const securityKey = card.key;
        for(var i = 0; i < 5; i++) {
            // the cipher function
            const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
            switch (i) {
                case 0:
                    // getting the msg (cardLastFour)
                    let msgCard = card.cardLastFour;
                    let encryptedCard = cipher.update(msgCard, "utf-8", "hex");
                    encryptedCard += cipher.final("hex");
                    card.cardLastFour = encryptedCard;
                    break;
                case 1:
                    // getting the msg (address)
                    let msgAddress = card.address;
                    let encryptedAddress = cipher.update(msgAddress, "utf-8", "hex");
                    encryptedAddress += cipher.final("hex");
                    card.address = encryptedAddress;
                    break;
                case 2:
                    // getting the msg (city)
                    let msgCity = card.city;
                    let encryptedCity = cipher.update(msgCity, "utf-8", "hex");
                    encryptedCity += cipher.final("hex");
                    card.city = encryptedCity;
                    break;
                case 3:
                    // getting the msg (state)
                    let msgState = card.state;
                    let encryptedState = cipher.update(msgState, "utf-8", "hex");
                    encryptedState += cipher.final("hex");
                    card.state = encryptedState;
                    break;
                case 4:
                    // getting the msg (zip)
                    let msgZip = card.zip;
                    let encryptedZip = cipher.update(msgZip, "utf-8", "hex");
                    encryptedZip += cipher.final("hex");
                    card.zip = encryptedZip;
                    break;
            }
        }
        next();
    }
});

// export decrypting function for cardlastfour
CardSchema.methods.decryptCard = function() {
    const card = this;
    const initVector = card.vect;
    const securityKey = card.key;
    let cardDecipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedCard = cardDecipher.update(this.cardLastFour, "hex", "utf-8");
    decryptedCard += cardDecipher.final("utf8");
    return decryptedCard;
}

// export decrypting function for address
CardSchema.methods.decryptAddress = function() {
    const card = this;
    const initVector = card.vect;
    const securityKey = card.key;
    let addressDecipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let cityDecipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let stateDecipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let zipDecipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedAddress = addressDecipher.update(this.address, "hex", "utf-8");
    let decryptedCity = cityDecipher.update(this.city, "hex", "utf-8");
    let decryptedState = stateDecipher.update(this.state, "hex", "utf-8");
    let decryptedZip = zipDecipher.update(this.zip, "hex", "utf-8");

    decryptedAddress += addressDecipher.final("utf8");
    decryptedCity += cityDecipher.final("utf8");
    decryptedState += stateDecipher.final("utf8");
    decryptedZip += zipDecipher.final("utf8");
    const fullAddress = decryptedAddress + " " + decryptedCity + ", " + decryptedState + " " + decryptedZip;
    return fullAddress;
}

module.exports = mongoose.model("Card", CardSchema);
