import { PUSH_MESS, CLEAR_MESS } from "./notificationActionType"
const initialState = {
    content : null
}

export const messReducer = (state = initialState, action) => {

    switch(action.type){

        case PUSH_MESS:
            return {
                content : action.payload.mess
            }
        
        case CLEAR_MESS:
            return {
                content : null
            }

        default: return state
    }

} 