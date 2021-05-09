const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    owner: {                            //who is the owner of this comment?
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    belongToPost: {                     // which post is this comment belong to?
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    content : String,                   //content

    like: [{                            //who like this comment
        type : Schema.Types.ObjectId,
        ref: "User"
    }],

    dislike: [{                         //who dislike
        type : Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt : Number

});

const Comment = model("Comment", CommentSchema, "dislikes");

module.exports = Comment;
module.exports.CommentSchema = CommentSchema;