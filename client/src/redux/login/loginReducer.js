import { 
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_GOOGLE_START,
    LOGIN_GOOGLE_SUCCESS,
    LOGIN_GOOGLE_FAILURE,
    LOGOUT,
} from './loginActionType'

const initialState = {
    isLoading : null,
    error: null,
}

export const loginReducer = (state = initialState, action) => {
    const { payload } = action

    switch(action.type){
        case LOGIN_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        case LOGIN_GOOGLE_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case LOGIN_GOOGLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case LOGIN_GOOGLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        
        case LOGOUT:
            return state

        default:
            return state
    }
}