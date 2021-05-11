import { 
    REACT_POST,
    COMMENT_POST,

    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    PUSH_NEW_POST,
    
    FETCH_MORE_POST_START,
    FETCH_MORE_POST_SUCCESS,
    FETCH_MORE_POST_FAILURE
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
    skip: 0
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
            const sortedPost = action.payload.posts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                skip : state.posts.length + sortedPost.length,
                posts : [...sortedPost],
                // posts : [...sortedPost, ...state.posts],
            }

        case FETCH_POST_FAILURE:
            return {
                ...state,
                isFetching : false,
                fetchError : action.payload.error.message,
                skip : state.posts.length
            }

        case PUSH_NEW_POST:
            const { post } = action.payload.post;
            console.log(post)
            console.log([post, ...state.posts])
            return {
                ...state,
                skip : state.posts.length + 1,
                posts : [post, ...state.posts],
            }
        
    //////////////////////////////////////
        case FETCH_MORE_POST_START:
            return {
                ...state,
                isFetching : true,
                fetchError : null,
            }

        case REACT_POST:
            const { reactedPost } = action.payload
            console.log("REACT_POST",  reactedPost )
            const updatedPosts = [...state.posts.map(post => reactedPost._id === post._id? reactedPost: post)]
            return {
                ...state,
                posts: [...updatedPosts]
            }

        // case COMMENT_POST:
        //     const { comment } = action.payload
        //     console.log("COMMENT_POST",  comment )
        //     return {
        //         ...state,
        //         posts: [...state.posts.map(post => comment.belongToPost === post._id? post.comments : post )]
        //     }

        case FETCH_MORE_POST_SUCCESS:
            return {
                ...state,
                isFetching : false,
                fetchError : null,
                skip : state.posts.length + action.payload.posts.length,
                posts : [...state.posts, ...action.payload.posts],
            }
        
        case FETCH_MORE_POST_FAILURE:
            return {
                ...state,
                isFetching: false,
                fetchError: action.payload.error.message
            }
        
        default:
            return state
    }
}