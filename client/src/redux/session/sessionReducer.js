import { 
    FETCH_SESSION_START,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE
} from './sessionActionType'

const initialState = {
    user : null,
    error : null
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCH_SESSION_START:
            return {
                ...state,
                user : null,
                error : null
            }
        
        case FETCH_SESSION_SUCCESS:
            return {
                ...state,
                user : action.payload,
                error : null
            }
        
        case FETCH_SESSION_FAILURE:
            return {
                ...state,
                error : action.payload,
                user : null
            }
        
        default:
            return state
    }
}

