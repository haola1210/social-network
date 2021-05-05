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

module.exports.delete = (req, res) => {
    try {
        Group.deleteMany({}).then(response => {
            if (response.ok) {

                if (response.deletedCount > 0) {

                    return res.json({
                        code: 200,
                        message: "Getting all posts",
                        data: response
                    })
                }
                else {
                    // throw new Error("There is no any post to delete")
                    return res.json({
                        code: 200,
                        message: "There is no any post to delete",
                        data: null,
                        error: "There is no any post to delete",
                    })
                }
            }
            else throw new Error("Deleting all posts failed")
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    }
}

module.exports.create = (req, res) => {

    const { code, name } = req.body;
    Group.find({ code }).then(response => {
        if (response.length > 0) {
            throw new Error(`Can't create group with existing code Group ${response[0].name}`);
        }
        else {
            return  Group.create({ code, name })
        } 
    })
    .then(group => {
        if (group) {
            console.log(`group`);
            console.log( group);
            return res.json({
                code: 200,
                message: "Create group Successfully",
                data: {
                    name: group.name,
                }
            })
        }
        else {
            throw new Error("Create group failed")
        }
    })
    .catch (error => {
        res.json({
            code: 400,
            message: "Error Occurs",
            error: error.message,
        })
    })
}

// module.exports.createPost = (req, res) => {
//     try {
//         const post = req.body;
//         Group.create(post).then(newPost => {
//             if (newPost) {
//                 return res.json({
//                     code: 200, 
//                     message: "Creating new post Successfully",
//                     data: newPost,
//                 })
//             }
//             throw new Error("Creating new post failed")
//         })
//     } catch (error) {
//         res.json({
//             code: 400,
//             message: "Error Occurs",
//             error: error.message,
//         })
//     }
// }