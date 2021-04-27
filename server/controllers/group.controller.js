const Group = require("../models/group.model")

module.exports.index = (req, res) => {
    try {
        
        Group.find({}).then(posts => {
            if (posts) {
                return res.json({
                    code: 200,
                    message: "Getting all posts",
                    data: posts
                })
            }
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    }
}

module.exports.createPost = (req, res) => {
    try {
        const post = req.body;

        Group.create(post).then(newPost => {
            if (newPost) {
                return res.json({
                    code: 200, 
                    message: "Creating new post Successfully",
                    data: newPost,
                })
            }
            throw new Error("Creating new post failed")
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    }
}