const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const User = require("../models/user.model")
const maxAge = 60 * 60
// const generateAccessToken = (user) => jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, optionAccessToken)
const generateAccessToken = (user) => jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge })
const generateRefreshToken = (user) => jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET)

let refreshTokens = []

module.exports.index = (req, res) => {
    return res.json({ 
        data: "form login"
    })
}

module.exports.login = (req, res) => {
    try {
        const {username, password} = req.body;

        User.findOne({username})
            .then( (user) => {
                if (!user) {
                    return res.json({
                        code: 404,
                        message: "User doesn't exists"
                    })
                }
                else {
                    bcrypt.compare(password, user.password)
                        .then((isValid, error, ) => {
                            if(error) { throw new Error(error)}
                            if (isValid) {
                                const accessToken = generateAccessToken(user)
                                const refreshToken = generateRefreshToken(user)
                                refreshTokens.push(refreshToken)
                                return res.json({
                                    code: 200,
                                    message: "User Login Successfully",
                                    data: {
                                        token: {accessToken, refreshToken},
                                        googleId: user.googleId,
                                    },
                                })
                            }
                            throw new Error("Password is incorrect")
                        })
                }
            })
            .catch(error => {
                console.log("Catch Error")
                throw new Error(error.message)
            })

    } catch (error) {
        console.log(error.message)
        res.json({
            code:400,
            message: "Error Occurs",
            error: error.message,
        })
    }
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect("/auths")
}

module.exports.findGoogleUser = (req, res) => {
    try {
        const { googleId } = req.params;

        console.log(`Starting Find Current User`)
        
        User.findOne({googleId})
            .then(user => {
                if (user) {
                    console.log(`Finded User Successfully`)
                    return res.json({
                        code: 200,
                        data: user,
                        message: "Finded User Successfully",
                    })
                }
                
                console.log(`User not found`)
                return res.json({
                    code: 404,
                    data: null,
                    message: "User not found",
                })
            })
            .catch(error => {
                throw new Error(error.message)
            })
    } catch (error) {
        console.log(error.message)
        res.json({
            code: 400,
            message: 'Error occurs',
            error: error.message
        })       
    }
}

module.exports.registerGoogleUser = (req, res) => {
    try {
        let { googleUser } = req.body,
            {
                email,
                familyName,
                givenName,
                imageUrl,
            } = googleUser
            googleUser = {...googleUser,
                username: email,
                lastName: familyName,
                firstName: givenName,
                image: imageUrl,
                class: null
            }
        const { googleId } = googleUser;
        
        console.log(`Starting Find Current User`)

        User.findOne({googleId})
            .then(currentUser => {
                if (currentUser) {
                    console.log(`Finded User Successfully`)
                    return res.json({
                        code: 200,
                        data: currentUser,
                        message: "Finded User Successfully",
                    })
                }

                console.log(`Creating New User`)
                return User.create(googleUser)
            })
            .then(newUser => {
                if (newUser) {
                    console.log(`Creating User Successfully`)
                    return res.json({
                        code: 201,
                        data: newUser,
                        message: "Creating User Successfully",
                    })
                }
                
                console.log(`Creating User failed`)
                return res.json({
                    data: null,
                    message: "Creating User failed",
                    error: "Creating User failed",
                })
            })
            .catch(error => {
                throw new Error(error.message)
            })
        
    } catch (error) {
        console.log(error.message)      
        res.json({
            code: 400,
            message: 'Error occurs',
            error: error.message
        })  
    }
}