import {
    PUSH_ERROR,
    CLEAR_ERROR
} from "./errorActionType"

const initialState = {
    content : null
}

export const errorReducer = (state = initialState, action) => {
    switch(action.type){

        case PUSH_ERROR:
            return {
                content : action.payload.error.message
            }

        case CLEAR_ERROR:
            return {
                content : null
            }

        default: return state

    }
}