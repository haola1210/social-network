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