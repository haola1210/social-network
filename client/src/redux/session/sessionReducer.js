import { 
    SET_SESSION,
    CLEAR_SESSION,
    FETCHING_SESSION
} from './sessionActionType'

const initialState = {
    user : null,
    jwt : null,
    isFetching : false
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
        
        case CLEAR_SESSION:
            return {
                ...state,
                user : null,
                jwt : null,
                isFetching : false
            }

        default:
            return state
    }
}

