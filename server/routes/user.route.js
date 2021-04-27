const router = require('express').Router();

const controller = require('../controllers/user.controller');

router.get("/profile", controller.profile)
router.post("/token/:token", controller.tokenUser)

module.exports = router;