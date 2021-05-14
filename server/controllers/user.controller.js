const bcrypt = require('bcrypt');

const User = require("../models/user.model");

module.exports.profile = (req, res) => {
    return res.json({
        data: "Profile",
        user: req.user.username
    })
}

module.exports.tokenUser = (req, res) => {
    try {
        const { token } = req.params;

        User.findOne({googleId: token})
            .then((user) => {
                if (user === null) { throw new Error("Invalid User")}
                return res.json({
                    code: 200,
                    message: "Getting User From Token",
                    data: { user }
                })
            })
            .catch(error => { throw new Error(error.message)})
        
    } catch (error) {
        console.log(error.message)        
        res.json({
            code: 400,
            messgae: "Error Occurs",
            error: error.message,
        })
    }
}

module.exports.index = (req, res) => {
    try {
        
        User.find({}).then(users => {
            if (users) {
                return res.json({
                    code: 200,
                    message: "Getting all users",
                    data: users
                })
            }
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    }
}

module.exports.register = (req, res) => {
    const { name, username, password, manageGroup } = req.body;
    
    // res.json({
    //     code: 400
    // })
    User.find({ username }).then(user => {
        if (user.length > 0) {
            throw new Error("There is already a user")
        }
        return User.create({ name, username, password, manageGroup, role: "faculty-room" })
    }).then(newUser => {
        if (newUser) {
            return res.json({
                code: 200,
                message: "Registering new user Successfully",
                data: newUser,
            })
        }
        throw new Error("Registering new user failed");
    }).catch (error => {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })        
    })
}