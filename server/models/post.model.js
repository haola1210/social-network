const { Schema, model } = require('mongoose');

const { CommentSchema } = require('./comment.model')

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
    image: [String],                    //danh sach anh.
    videoEmbed: {                       //danh sach video youtube
        type: String,
        default: null
    },
    belongToGroup : {                   // thuoc ve group nao, neu null thi thuoc ve user profile
        type: Schema.Types.ObjectId,
        ref: "Group",
        default: null
    },

    read : [{                           //danh sach user da xem
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt : Number

});

// PostSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps


const Post = model("Post", PostSchema, "posts");

module.exports = Post;
module.exports.PostSchema = PostSchema;