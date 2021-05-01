import {
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from "./signinActionType"

const initialState = {
    isLoading : false,
    error: null
}


export const signinReducer = (state = initialState, action) => {
    switch(action.type){

        case SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                error : null
            }
        
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        
            case SIGN_IN_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload.error.message
                }

        default: return state
    }

}