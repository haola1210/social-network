const router = require('express').Router();

const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware')


router.get("/profile", authMiddleware, controller.profile)

module.exports = router;