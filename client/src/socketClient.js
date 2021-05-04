import { io } from 'socket.io-client';
import { 
    MAKING_POST,
} from './redux/post/postActionType'

export const INIT_SOCKET = "INIT_SOCKET"

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

    } else if (action.type === MAKING_POST) {
        
        const { content, fileList, belongToGroup } = action.payload

        socket.emit("client-make-post", { 
            content,
            fileList,
            belongToGroup,
            owner: user._id,
        })

    } else return next(action)

}