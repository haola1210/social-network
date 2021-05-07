import { 
    MAKING_POST,

    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE
} from './postActionType'

/**  posts constructor -- hao le
 * posts : []
        ....
   }   
 */
 
const initialState = {
    posts: [],
    isFetching : false,
    fetchError : null,

    isLoading: false,
}

export const postReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCH_POST_START:
            console.log("fetching")
            return {
                ...state,
                isFetching : true,
                fetchError : null
            }
        
        case FETCH_POST_SUCCESS:
            console.log("fetch ok", action.payload.posts)
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                posts : [...state.posts, ...action.payload.posts]
            }

        case FETCH_POST_FAILURE:
            return {
                ...state,
                isFetching : false,
                fetchError : action.payload.error.message
            }
        


        case MAKING_POST:
            const { post } = action.payload;
            return {
                ...state,
            }

        default:
            return state
    }
}