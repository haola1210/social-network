import { 
    SET_SESSION,
    CLEAR_SESSION,
    FETCHING_SESSION
} from './sessionActionType'
import { 
    STORE_SOCKET,  
    UPLOAD_IMAGE,
} from '../../socketClient'

const initialState = {
    user : null,
    jwt : null,
    isFetching : false,
    socket: null
}

export const sessionReducer = (state = initialState, action) => {
   
    switch(action.type){

        case FETCHING_SESSION:
            return {
                ...state,
                isFetching : true,
                user : null,
                jwt : null
            }

        case SET_SESSION:
            return {
                ...state,
                user : action.payload.user,
                jwt : action.payload.jwt,
                isFetching : false
            }

        case UPLOAD_IMAGE:
            return {
                ...state,
                user : action.payload.user,
            }
        
        case STORE_SOCKET:
            return {
                ...state,
                socket : action.payload.socket
            }
        
        case CLEAR_SESSION:
            return {
                ...state,
                user : null,
                jwt : null,
                isFetching : false,
                socket : null
            }

        default:
            return state
    }
}

