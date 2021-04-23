const User = require("../models/user.model");

module.exports.profile = (req, res) => {
    return res.json({
        data: "Profile",
        user: req.user.username
    })
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
        console.log(`Catch Error`)
        console.log(error)         
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
        console.log(`Catch Error`)
        console.log(error)      
        res.json({
            code: 400,
            message: 'Error occurs',
            error: error.message
        })  
    }
}