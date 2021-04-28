const { Schema, model } = require('mongoose');

const { CommentSchema } = require('./comment.model')
const { LikeSchema } = require('./like.model')
const { DislikeSchema } = require('./dislike.model')

const PostSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,    //ng viet bai
        ref: "User"
    },
    content: {
        type: String,                   //noi dung
        default: null,
    },
    // comments: [{
    //     type : Schema.Types.ObjectId,   //danh sach cac comment
	// 	ref : "Comment",
    // }],
    likes: [{ 
        type : Schema.Types.ObjectId,   //danh sach user like
		ref : "User",
    }],
    dislikes: [{
        type : Schema.Types.ObjectId,   //danh sach user dislike
		ref : "User",
    }],
    timeStamp: {                        //thoi gian
        type: Date,
        default: Date.now()
    },
    image: [String],                    //danh sach anh.
    videoEmbed: {                       //danh sach video youtube
        type: String,
        default: null
    },
    belongToGroup : {                        // thuoc ve group nao, neu null thi thuoc ve user profile
        type: Schema.Types.ObjectId,
        ref: "Group",
        default: null
    }
});

const Post = model("Post", PostSchema, "posts");

module.exports = Post;
module.exports.PostSchema = PostSchema;