import { 
    GET_JWT_LOCAL_STORAGE,
    SET_JWT_LOCAL_STORAGE,
    CLEAR_JWT_LOCAL_STORAGE
} from './authActionType'

const initialState = {
    token : null
}

export const authReducer = (state = initialState, action) => {
    const jwt = action.payload
    switch(action.type){
        case GET_JWT_LOCAL_STORAGE:
            return {
                ...state,
                token : jwt
            }
        
        case SET_JWT_LOCAL_STORAGE:
            return {
                ...state,
            }
        
        case CLEAR_JWT_LOCAL_STORAGE:
            return initialState

        default:
            return state
    }
}