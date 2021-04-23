import { 
    GET_JWT_LOCAL_STORAGE,
    SET_JWT_LOCAL_STORAGE,
    CLEAR_JWT_LOCAL_STORAGE
} from './authActionType'

const initialState = {
    accessToken : null,
    tokenId: null,
}

export const authReducer = (state = initialState, action) => {
    const jwt = action.payload
    switch(action.type){
        case GET_JWT_LOCAL_STORAGE:
            return {
                ...state,
                tokenId : jwt.tokenId,
                accessToken : jwt.accessToken,
            }
        
        case SET_JWT_LOCAL_STORAGE:
            return {
                ...state,
                tokenId : jwt.tokenId,
                accessToken : jwt.accessToken,
            }
        
        case CLEAR_JWT_LOCAL_STORAGE:
            return initialState

        default:
            return state
    }
}