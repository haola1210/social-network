import { 
    LIST_GROUP_SUCCESS,
    LIST_GROUP_FAILED,
    SET_GROUP_SUCCESS,
    SET_GROUP_FAILED,
} from "./groupActionType"

const initialState = {
    listGroup: [],
    currentGroup: {
        _id: null,
        name: null,
    },
    error: null,
}

export const groupReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case LIST_GROUP_SUCCESS:
            return {
                ...state,
                listGroup: action.payload.listGroup
            }
        
        case SET_GROUP_SUCCESS:
            return {
                ...state,
                currentGroup: action.payload.currentGroup,
            }
        
        case LIST_GROUP_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        
        case SET_GROUP_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        
        default: 
            return state
    }
}