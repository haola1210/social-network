import { io } from 'socket.io-client';
export const INIT_SOCKET = "INIT_SOCKET"


let socket = null

export const socketMiddleware = storeAPI => next => action => {
    
    
    if(action.type === INIT_SOCKET){

        const { user } = storeAPI.getState().session
        const handshake = {
            auth : {
                userId : user._id
            }
        }
        socket = io("http://localhost:4000", handshake)

    } else return next(action)

}