import { 
    GET_JWT_LOCAL_STORAGE,
    SET_JWT_LOCAL_STORAGE,
    CLEAR_JWT_LOCAL_STORAGE,
    FETCH_SESSION_START,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE,

} from './sessionActionType'

const initialState = {
    accessToken : null,
    tokenId: null,
    user : null,
    error : null
}

export const sessionReducer = (state = initialState, action) => {
    const session = action.payload
    switch(action.type){

        // AUTH
        case GET_JWT_LOCAL_STORAGE:
            return {
                ...state,
                tokenId : session.tokenId,
                accessToken : session.accessToken,
            }
        
        case SET_JWT_LOCAL_STORAGE:
            return {
                ...state,
                tokenId : session.tokenId,
                accessToken : session.accessToken,
            }
        
        case CLEAR_JWT_LOCAL_STORAGE:
            return {...initialState,
                user: state.user, 
                error: state.error,
            }

        // SESSION
        case FETCH_SESSION_START:
            return {
                ...state,
                user : null,
                error : null
            }
        
        case FETCH_SESSION_SUCCESS:
            return {
                ...state,
                user : session.user,
                error : null
            }
        
        case FETCH_SESSION_FAILURE:
            return {
                ...state,
                error : session.error,
                user : null
            }
        
        default:
            return state
    }
}

