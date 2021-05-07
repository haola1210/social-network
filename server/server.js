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

    
    Post.find({})
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
    })



    // init comment per post 
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


    // new post 
    socket.on("client-make-post", async ({ content, fileList, belongToGroup, owner, }) => {
        
        // console.log(`get client-make-post`);
        // console.log({ content, fileList, belongToGroup, owner, });
        
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
        const newPost = await Post.create(post)
        console.log("server created new post")
        io.emit("server-send-new-post", { post: newPost})
    })
})


server.listen( port, () => {
    console.log(`server listening on port ${port}: http://localhost:${port}`);
})