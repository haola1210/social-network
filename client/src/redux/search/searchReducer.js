import { 
    SEARCH_START,
    SEARCH_FAILURE,
    SEARCH_SUCCESS,

    SEARCH_POSTS,
    SEARCH_PEOPLE,
    SEARCH_GROUPS,

} from './searchActionType'

const initialState = {
    results: {
        posts: [],
        groups: [],
        people: [],
    },
    isFetching : false,
    fetchError : null,
    skip: 0
}

export const searchReducer = (state = initialState, action) => {
    switch(action.type){

        case SEARCH_START:
            console.log("fetching")
            return {
                ...state,
                isFetching : true,
                fetchError : null,
            }

        case SEARCH_GROUPS:
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                results: {
                    ...state.results,
                    groups: [ ...action.payload.groups ],
                }
            }

        case SEARCH_POSTS:
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                results: {
                    ...state.results,
                    posts: [ ...action.payload.posts ],
                }
            }

        case SEARCH_PEOPLE:
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                results: {
                    ...state.results,
                    people: [ ...action.payload.people ],
                }
            }
            
        case SEARCH_FAILURE:
            return {
                ...state,
                isFetching : false,
                fetchError : action.payload.error,
                
            }
            
        case SEARCH_SUCCESS:
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                results: {
                    ...state,
                    posts: action.payload.posts? [...action.payload.posts] : [...state.results.posts],
                    groups: action.payload.groups? [...action.payload.groups] : [...state.results.groups],
                    people: action.payload.people? [...action.payload.people] : [...state.results.people],
                }
                
            }

        default:
            return state
    }
}