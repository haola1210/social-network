const router = require('express').Router();

const controller = require('../controllers/group.controller');

router.route("/")
    .get(controller.index)
    .delete(controller.delete)
    .post(controller.create)
// router.post("/", controller.tokenUser)

module.exports = router;