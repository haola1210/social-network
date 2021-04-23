require('dotenv').config({path: ".env"})
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model')

// get user from strategy callback logic  then send to cookies
passport.serializeUser((user, done) => {
    console.log(`serializeUser`)
    console.log(user)
    done(null, user._id);
})

// get id from cookies
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        // options
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRECT,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => {
        /** 
         * profile.id
         * profile.displayName
         * profile.emails [{
         *  value: "",
         *  verified: false||true
         * }]
         * profile.gender
         * profile.photos [{
         *  value: "",
         * }]
         * */ 
        console.log(`Token`)
        console.log(accessToken, refreshToken)
        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if (currentUser) {
                    // already have the user in database
                    console.log(`Finded User`)
                    console.log(currentUser)
                    done(null, currentUser)
                    return;
                }
                return User.create({
                    username: profile.displayName,
                    googleId: profile.id,
                })
            }).then((newUser) => {
                if (newUser) {
                    console.log(`User create new`)
                    console.log(newUser)
                    done(null, newUser)
                }
            })
    })
) 