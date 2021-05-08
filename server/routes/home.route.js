const router = require('express').Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const groupRoute = require('./group.route');
const postRoute = require('./post.route')

// const postRoute = require('./post.route');
// const dislikeRoute = require('./dislike.route');
// const likeRoute = require('./like.route');
// const commentRoute = require('./comment.route');

router.use("/auths", authRoute);
router.use("/users", userRoute);
router.use("/groups", groupRoute);
router.use("/posts", postRoute);
// router.use("/posts", postRoute);
// router.use("/comments", commentRoute);
// router.use("/likes", likeRoute);
// router.use("/dislikes", dislikeRoute);
// router.get("/", (req, res) => {
//     res.render('home')
// });

module.exports = router;