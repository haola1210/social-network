const Post = require("../models/post.model");

module.exports.react = (req, res) => {

    const { id, user, reaction, } = req.body;

    Post.findById(id).then(async ( post ) => {
        if(post) {
            const reacted = post[reaction].includes(user);
            let reactions = ["likes", "dislikes",]
            // return res.json({
            //     next: reactions.filter(react => react !== reaction),
            //     data: post
            // })
            const restReactions = reactions.filter(react => react !== reaction)
            if (reacted) {
                return Post.findOneAndUpdate({ _id: id }, { $pull: { [reaction]: user }}, { new: true })
            }
            else {
                const updates = await Promise.all([
                    Post.findOneAndUpdate({ _id: id }, { $push: { [reaction]: user }}, { new: true }),
                    restReactions.forEach(async ( restReaction ) => 
                        await Post.findOneAndUpdate({ _id: id }, { $pull: { [restReaction]: user }})
                    ),
                ])
                return updates[0];
            }
        }
        else {
            return res.json({
                message: "no post",
            })
        }
    })
    .then(updatedPost => {
        if (updatedPost) {
            return res.json({ 
                code: 200,
                message: "Reaction updates successfully",
                data: updatedPost,
            })
        }
        else throw new Error("Reaction updates failed")
    })
    .catch(error => {
        res.json({
            code: 400,
            message: "Error Occurs",
            errors: error.message,
        })
    })

}

module.exports.reactComment = (req, res) => {

    const { id, user, reaction, } = req.body;

    Post.findById(id).then(async ( post ) => {
        if(post) {
            const reacted = post[reaction].includes(user);
            let reactions = ["likes", "dislikes",]
            // return res.json({
            //     next: reactions.filter(react => react !== reaction),
            //     data: post
            // })
            const restReactions = reactions.filter(react => react !== reaction)
            if (reacted) {
                return Post.findOneAndUpdate({ _id: id }, { $pull: { [reaction]: user }}, { new: true })
            }
            else {
                const updates = await Promise.all([
                    Post.findOneAndUpdate({ _id: id }, { $push: { [reaction]: user }}, { new: true }),
                    restReactions.forEach(async ( restReaction ) => 
                        await Post.findOneAndUpdate({ _id: id }, { $pull: { [restReaction]: user }})
                    ),
                ])
                return updates[0];
            }
        }
        else {
            return res.json({
                message: "no post",
            })
        }
    })
    .then(updatedPost => {
        if (updatedPost) {
            return res.json({ 
                code: 200,
                message: "Reaction updates successfully",
                data: updatedPost,
            })
        }
        else throw new Error("Reaction updates failed")
    })
    .catch(error => {
        res.json({
            code: 400,
            message: "Error Occurs",
            errors: error.message,
        })
    })

}

module.exports.fetchPost = (req, res) => {
    Post.find({ belongToGroup: req.params.idGroup }).sort({ "createdAt": -1 }).skip(0).limit(5)
    .populate('owner')
    .populate('belongToGroup')
    .exec()
    .then(async posts => {
            
        // console.log("send posts to client")
        // socket.emit("server-init-post", { posts })
        res.json({
            message: "fetch successfully",
            data: posts,
        })
    
    })
    .catch(error => {
        // console.log(error.message)
        // socket.emit("server-init-post", { error })
        // socket.emit("server-send-error", { error: { message : "Can not fetch posts! Something wrong, plz contact developer" } })
        res.json({
            message: "Error Occurs",
            error: error.message
        })
    })
}

module.exports.searchPosts = (req, res) => {
    let { search } = req.body;

    Post.aggregate([
        { $lookup: {
            "from": "users",
            "localField": "owner",
            "foreignField": "_id",
            "as": "owner"
        }}, {$unwind: '$owner'},
        { $match: { "owner.name": { $regex: `.*${search}.*` , $options: 'i'} } },
    ]).then(posts => {
        if (posts.length > 0) {
            return res.json({
                code: 200,
                message: "Search Posts successfully",
                data: posts,
            })
        }
        else throw new Error("Non found posts")
    }).catch(error => {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    })
}