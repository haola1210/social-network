const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');

router.get("/", controller.index)
router.post("/local", controller.login)
router.get("/logout", controller.logout);

router.get("/google/:googleId", controller.findGoogleUser)
router.post("/google", controller.registerGoogleUser)

module.exports = router;