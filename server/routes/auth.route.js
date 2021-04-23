const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');
const passportSetup = require('../configs/auths.setup');

router.get("/", controller.index)
router.post("/login", controller.login);
router.delete("/logout", controller.logout);
// google auth with passport
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
// callback route for google for redirect to
// router.get("/google/redirect", passport.authenticate("google"), controller.loginGoogle)
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log("Login successfully with Google account")
    console.log(req.user)
    res.redirect("/users/profile")
    // return res.json({
    //     message: "Login successfully with Google account",
    //     data: req.user,
    // })
})

module.exports = router;