const { Schema, model } = require('mongoose');

const LikeSchema = new Schema({
    userId: {
        type: String,
        default: null,
    },
    postId: {
        type: String,
        default: null,
    },
    commentId: {
        type: String,
        default: null,
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    },
});

const Like = model("Like", LikeSchema, "likes");

module.exports = Like;
module.exports.LikeSchema = LikeSchema;