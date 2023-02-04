/**
 *  Defining the CRUD functions that will be called in routes/promo.js 
 */
// importing model
const { findOne } = require("../models/promo");
const Promo = require("../models/promo");
const { promoEmail } = require("./users");
const User = require("../models/users");
const sendEmail = require("../utils/sendEmail");

// export addMovie function
exports.addPromo = async (req, res) => {
    try {
        let promo = await Promo.findOne({code: req.body.code});
        if (!promo) {
            let newPromo = new Promo({
                descriptor: req.body.descriptor,
                discount: req.body.discount,
                code: req.body.code,
                sentEmail: false,
            })
                await newPromo.save();
                return res.json(newPromo);
        } else {
            return res.status(400).json({ message: "Promotion already exists"})
        }
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
};

exports.sendPromo = async (req, res) => {
    let promoId = req.body.id;

    try {

        let promotion = await Promo.findOne({_id: promoId});
        //finds users who want promotional emails and puts them in an array
        const promoUsers = [];
        const cursor = User.find({promo: true});
        const cursorArray = await cursor.exec()
        
        //pushes all the users emails into an array
        cursorArray.forEach((result) => { 
            promoUsers.push(result.email);
        });

        //sends each email in the array a promotional email
        if (promoUsers.length > 0) {
            promoUsers.forEach(async (result) => {
                try {
                    await sendEmail(result, "Promotional Email", `Check out our new promotion!\n${promotion.descriptor}\nUse code ${promotion.code}`);
                } catch (e) {
                    console.log(`Promotional email could not be sent to ${result}`);
                    return res.status(400).json(e);
                }
            })
        }
        
        promotion.sentEmail = true;
        await promotion.save();
        return res.json({message: "sent"});
        
    } catch (e) {
        console.log(e);
        return res.status(404).json(e);
    }
};

exports.findPromos = async (req, res) => {
    let currentPromos = await Promo.find({});
    if (!currentPromos) {
        return res.status(404).json({ message: "Promo code not found"});
    }

    return res.json(currentPromos);
}

exports.checkPromo = async (req, res) => {

    try {
        let promo = await Promo.findOne({code: req.body.code})
        if (!promo) {
            return res.status(400).json({message: "No promo code found"});
        }

        return res.json(promo)

    } catch(e) {
        console.log(e);
        return res.status(404).json(e);
    }
}