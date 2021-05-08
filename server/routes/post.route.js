const router = require('express').Router();

const controller = require('../controllers/post.controller')

router.route('/react')
    .post(controller.react)

module.exports = router;