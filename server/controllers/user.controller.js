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