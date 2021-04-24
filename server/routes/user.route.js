const router = require('express').Router();

const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')


router.get("/profile", controller.profile)
router.get("/google/:googleId", controller.findGoogleUser)
router.post("/google", controller.registerGoogleUser)
router.post("/local", controller.login)
router.post("/token/:token", controller.tokenUser)

module.exports = router;