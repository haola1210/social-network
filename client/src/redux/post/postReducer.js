import { 
    MAKING_POST,
} from './postActionType'

const initialState = {
    posts: [],
    isLoading: false,
}

export const postReducer = (state = initialState, action) => {
    switch(action.type){

        case MAKING_POST:
            const { post } = action.payload;
            return {
                ...state,
            }

        default:
            return state
    }
}