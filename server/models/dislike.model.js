const { Schema, model } = require('mongoose');

const DislikeSchema = new Schema({
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

const Dislike = model("Dislike", DislikeSchema, "dislikes");

module.exports = Dislike;
module.exports.DislikeSchema = DislikeSchema;