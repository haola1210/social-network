const router = require('express').Router();

const controller = require('../controllers/user.controller');

router.route("/")
    .get( controller.index )
    .post( controller.register )
router.get("/profile", controller.profile)
router.post("/token/:token", controller.tokenUser)

module.exports = router;