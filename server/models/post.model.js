const { Schema, model } = require('mongoose');

const { CommentSchema } = require('./comment.model')
const { LikeSchema } = require('./like.model')
const { DislikeSchema } = require('./dislike.model')

const PostSchema = new Schema({
    userId: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
    comments: [{
        type : Schema.Types.ObjectId,
		ref : "Comment",
    }],
    likes: [{
        type : Schema.Types.ObjectId,
		ref : "Like",
    }],
    dislikes: [{
        type : Schema.Types.ObjectId,
		ref : "Dislike",
    }],
    timeStamp: {
        type: Date,
        default: Date.now()
    },
});

const Post = model("Post", PostSchema, "posts");

module.exports = Post;
module.exports.PostSchema = PostSchema;