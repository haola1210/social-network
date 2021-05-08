import { io } from 'socket.io-client';
import { 
    MAKING_POST,
    REACT_POST,
    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE
} from './redux/post/postActionType'


export const INIT_SOCKET = "INIT_SOCKET"
export const STORE_SOCKET = "STORE_SOCKET"
export const REACT_COMMENT = "REACT_COMMENT"

let socket = null

export const socketMiddleware = storeAPI => next => action => {
    
    const { user } = storeAPI.getState().session
    
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
///////////////////////////////////////////////////////////////////////



        socket.on("server-send-new-post", function(post) {
            console.log("new post created", post);
        })

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

    } else return next(action)

}