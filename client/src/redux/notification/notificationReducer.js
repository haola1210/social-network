import { PUSH_MESS } from "./notificationActionType"
const initialState = {
    content : ""
}

export const messReducer = (state = initialState, action) => {

    switch(action.type){

        case PUSH_MESS:
            return {
                content : action.payload.mess
            }

        default: return state
    }

} 