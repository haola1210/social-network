import { 
    LIST_GROUP_SUCCESS,
    LIST_GROUP_FAILED,
    SET_LOCATION_SUCCESS,
    SET_LOCATION_FAILED,
} from "./groupActionType"

const initialState = {
    listGroup: [],
    currentGroup: {
        _id: null,
        name: null,
    },
    location: null,
    error: null,
}

export const groupReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case LIST_GROUP_SUCCESS:
            return {
                ...state,
                listGroup: [...action.payload.listGroup]
            }
        
        case LIST_GROUP_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
            
        case SET_LOCATION_SUCCESS:
            return {
                ...state,
                location: action.payload.location,
            }
        
        case SET_LOCATION_FAILED:
            return {
                ...state,
                error: action.payload.error,
            }
        
        default: 
            return state
    }
}