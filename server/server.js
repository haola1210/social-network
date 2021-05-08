require('dotenv').config({path: "./configs/.env"});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const socketio = require('socket.io')
const http = require('http')

const User = require("./models/user.model")
const Post = require("./models/post.model")
const Comment = require("./models/comment.model")

const { cloudinary } = require("./configs/cloudinary.setup")

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.set('views', './views')
app.set('view engine', 'pug');


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

// cookieSession before passport init
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milisec
    keys: [process.env.COOKIE_SESSION_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log(`Server connected to database`))
const homeRoute = require('./routes/home.route');

app.use("/", homeRoute);

const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
    }
});

// auth for socket 
io.use(async (socket, next) => {
    // client should add userId into socket.auth 
    try {
        
        const userId = socket.handshake.auth.userId;
        if (!userId) throw new Error("Unauthorization connection")
    
        const user = await User.findById(userId).exec()
        if(!user) throw new Error("No one match your id")

        socket.user = user;
        next();
        
    } catch (error) {
        next(error)
    }
})


io.on("connection", socket => {
    // console.log("new socket connection");

    // User update socketId
    const { userId } = socket.handshake.auth;
    User.findByIdAndUpdate( userId, { socketId: socket.id }, { new: true })
        // .then(user => console.log(`update socketId ${user.socketId}`));

    
    Post.find({}).sort({ updatedAt: -1 }).skip(0).limit(5)
    .populate('owner')
    .populate('belongToGroup')
    .exec()
    .then(async posts => {
            
        console.log("send posts to client")
        socket.emit("server-init-post", { posts })
    
    })
    .catch(error => {
        console.log(error.message)
        socket.emit("server-init-post", { error })
        socket.emit("server-send-error", { error: { message : "Can not fetch posts! Something wrong, plz contact developer" } })
    })

    /////////////////////////////////////// init comment per post 
    socket.on("client-req-cmt", async data => {
        console.log("client: "+data.postId)
        try {
            const { postId } = data
            const skip = data.skip || 0
            const limit = 5
            const comments = await Comment.find({ belongToPost : postId }).sort({ timeStamp: -1 }).skip(skip).limit(limit)
            
            socket.emit("server-send-comment-list", { comments, postId })
        } catch (error) {
            socket.emit("server-send-comment-list", { error, postId: data.postId })
        }
    })
    //////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////// fetch more post
    socket.on("client-fetch-more-post", async ({skip}) => {
        try {
            const posts = await Post.find({})
            .sort({updatedAt : -1})
            .skip(skip)
            .limit(5)
            .populate("owner")
            .populate("belongToGroup")
    
            socket.emit("server-send-more-post", { posts })
            
        } catch (error) {
            socket.emit("server-send-more-post", {error : { message : "Can not show more post! error " }})
            socket.emit("server-send-error", {error : { message : "Can not show more post! error " }})
        }
    })
    ////////////////////////////////////////////////////////////////////////////

    // new post 
    socket.on("client-make-post", async ({ content, fileList, belongToGroup, owner, }) => {
        
        // console.log(`get client-make-post`);
        // console.log({ content, fileList, belongToGroup, owner, });
        
        try {
            let filedLoaded = await Promise.all([...fileList.map(async (base64) => {
                // upload image to cloudinary with based-64 image
                return await cloudinary.uploader.upload(base64);
            })])
            
            // console.log("file loaded", filedLoaded.map(file => file.url))
            filedLoaded = filedLoaded.map(file => file.url)
            const post = {
                owner,
                content,
                belongToGroup,
                image: [...filedLoaded]
            }

            const tempPost = new Post(post)
            await tempPost.save()
            await tempPost.populate("owner").populate("belongToGroup").execPopulate()
            console.log("server created new post")
            io.emit("server-send-new-post", { post: tempPost})
            
            
            // delete post no image - use for test
            // await Post.deleteMany({})


        } catch (error) {
            console.log(error.message)
            socket.emit("server-send-error", { error: { message : "You can not post right now! Plz contact developer" }})
        }

    })

    socket.on("client-react-post", ({ id, user, reaction, }) => {

        console.log("react-post ", reaction, id, "user ", user)

        Post.findById(id).then(async ( post ) => {
            if(post) {
                // should set reactions filed in post schema
                let reactions = ["likes", "dislikes",]
                const restReactions = reactions.filter(react => react !== reaction)
                const reacted = post[reaction].includes(user);
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
                io.emit("server-send-react-post", { post, postId: id})
            }
            else throw new Error("Reaction updates failed")
        }).catch(error => {
            io.emit("server-send-react-post", { error, postId: id})
        })
    })

    socket.on("client-comment-post", async ({ owner, content, belongToPost }) => {
        console.log("comment feature")
        console.log("get from client ", owner, content, belongToPost)
        try {
            const comment = await Comment.create({ content, owner, belongToPost, timeStamp: new Date()})
            io.emit("server-send-comment-post", { comment , belongToPost })
        } catch (error) {
            console.log(error)
            io.emit("server-send-comment-post", { error, belongToPost })            
        }

    })
})


server.listen( port, () => {
    console.log(`server listening on port ${port}: http://localhost:${port}`);
})