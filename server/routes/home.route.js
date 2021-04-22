const router = require('express').Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');

router.use("/auths", authRoute);
router.use("/users", userRoute);
router.get("/", (req, res) => {
    res.render('home')
});

module.exports = router;