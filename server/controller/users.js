/**
 *  Defining the CRUD functions that will be called in routes/users.js 
 */
// importing model
const User = require("../models/users");
const { use } = require("../routes/users");

// export createUser function
exports.createUser = async (req, res) => {
    let email = req.body.email;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already in use"});
    }
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        status: req.body.status,
        rememberMe: req.body.rememberMe,
        promo: req.body.promo,
        admin: false,
    })
    try {
        await newUser.save();

    } catch (e) {
        console.log(e);
        return res.json(e)
    }
};

// export login function
exports.login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Incomplete Request"});
    }
    try{
        let user = await User.findOne({ email: email });
        if (!user) {
            console.log("one");
            return res.status(404).json({ message: "Email not found"});
        }
        user.comparePassword(password, async function(matchError, isMatch) {
            if (matchError) {
                console.log("two")  
                return res.status(404).json({ message: "Error"});              
            } else if (!isMatch) {
                console.log("three")
                return res.status(404).json({ message: "Incorrect Password"});
            } else {
                return res.status(200).json(user);
            }
        });
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

// export updateInfo function
exports.updateInfo = async (req, res) => {
    let email = req.body.email;
    let updatedInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        promo: req.body.promo
    }
    try {
        let user = await User.findOneAndUpdate({email: email}, updatedInfo);
        return res.json(user);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export updatePassword function
exports.updatePassword = async (req, res) => {
    let { email, password, updatedPassword } = req.body;
    try {
    let user = await User.findOne({ email });
    user.comparePassword(password, async function(matchError, isMatch) {
        if (matchError) {
            return res.status(500).json({ message: "Error"});
        } else if (!isMatch) {
            return res.status(505).json({ message: "Incorrect Password"});
        } else if (isMatch) {
            user.password = updatedPassword;
            await user.save();
            return res.json(user);
        }
    });
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// exports the find all users function
exports.findAllUsers = async (req, res) => {
    try {
        //finds all objects in User database
        let allUsers = await User.find({});
        
        //if not are found return error message
        if (!allUsers) {
            return res.status(404).json({ message: "Internal Error"});
        }

        //other return allUsers
        return res.json(allUsers);

    } catch(e) {
        console.log(e);
        return res.status(404).json(e);
    }
};

