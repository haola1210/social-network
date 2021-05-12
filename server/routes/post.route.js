const router = require('express').Router();

const controller = require('../controllers/post.controller')

router.route('/react')
    .post(controller.react)
router.route('/:idGroup')
    .post(controller.fetchPost)
router.route('/search')
    .get(controller.searchPosts)

module.exports = router;