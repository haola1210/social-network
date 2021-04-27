const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
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
    comments: Array,
    timeStamp: {
        type: Date,
        default: Date.now()
    },
});

const Comment = model("Comment", CommentSchema, "dislikes");

module.exports = Comment;
module.exports.CommentSchema = CommentSchema;