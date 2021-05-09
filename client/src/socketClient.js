import { io } from 'socket.io-client';
import { 
    MAKING_POST,
    REACT_POST,
    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    PUSH_NEW_POST,
    FETCH_MORE_POST,
    FETCH_MORE_POST_START,
    FETCH_MORE_POST_FAILURE,
    FETCH_MORE_POST_SUCCESS
} from './redux/post/postActionType'

import { PUSH_ERROR } from "./redux/error/errorActionType"
import { PUSH_MESS } from "./redux/notification/notificationActionType"

export const INIT_SOCKET = "INIT_SOCKET"
export const STORE_SOCKET = "STORE_SOCKET"
export const REACT_COMMENT = "REACT_COMMENT"

let socket = null

export const socketMiddleware = storeAPI => next => action => {
    
    const { user } = storeAPI.getState().session
    const { posts } = storeAPI.getState()

    if(action.type === INIT_SOCKET){

        const handshake = {
            auth : {
                userId : user._id
            }
        }
        socket = io("http://localhost:4000", handshake)

        next({type: STORE_SOCKET, payload: { socket }})

////////////////////////////////////////////////////////////////////// init post here
        // dispatch fetch-post-start here
        next({
            type: FETCH_POST_START
        })
        socket.on("server-init-post", response => {
            if(response.error){
                // dispatch fetch post failure here
                console.log(response.error.message)
                next({
                    type: FETCH_POST_FAILURE,
                    payload : {
                        error : response.error
                    }
                })
            } else {
                //dispatch fetch post success here
                console.log(response.posts)
                next({
                    type : FETCH_POST_SUCCESS,
                    payload: {
                        posts : response.posts
                    }
                })
            }
        })


///////////////////////////////////////////////////////////////////         handle new post from server
        socket.on("server-send-new-post", function(post) {
            console.log("new post created", post);
            next({ type: PUSH_NEW_POST, payload: { post } })

        })
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////     handle error message from server
        socket.on("server-send-error", ({ error }) => {
            console.log(error)
            next({ type: PUSH_ERROR, payload: { error } })

        })
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////     handle notification message from server
        socket.on("server-send-noti", ({ mess }) => {

            next({ type: PUSH_MESS, payload: { mess } })

        })
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////  handle more post from server
        socket.on("server-send-more-post", response => {
            if(response.error){
                next({ type : FETCH_MORE_POST_FAILURE, payload: {error : response.error} })
            }

            if(response.posts){
                next({ type: FETCH_MORE_POST_SUCCESS, payload: { posts: response.posts } })
            }
        })
////////////////////////////////////////////////////////////////////////////

    } else if (action.type === MAKING_POST) {
        
        const { content, fileList, belongToGroup } = action.payload

        socket.emit("client-make-post", { 
            content,
            fileList,
            belongToGroup,
            owner: user._id,
        })
    } else if (action.type === REACT_POST) {
        
        const { reactedPost } = action.payload
        console.log("socketClient", REACT_POST, reactedPost)
        next({
            type : REACT_POST,
            payload: {
                reactedPost
            }
        })
    
    } else if(action.type === FETCH_MORE_POST){
        console.log(posts)
        next({ type : FETCH_MORE_POST_START })

        socket.emit("client-fetch-more-post", { skip : posts.skip })

    }
    
    else return next(action)

}