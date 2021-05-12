import {
    createStore,
    applyMiddleware,
    combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";

import { sessionReducer } from "./session/sessionReducer"
import { signinReducer } from "./signin/signinReducer"
import { groupReducer } from "./group/groupReducer"
import { postReducer } from "./post/postReducer"
import { errorReducer } from "./error/errorReducer"
import { messReducer } from "./notification/notificationReducer"
import { searchReducer } from "./search/searchReducer"

import rootSaga from "../saga/rootSaga"
import { socketMiddleware } from "../socketClient"

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    session : sessionReducer,
    signin : signinReducer,
    groups: groupReducer,          
    posts : postReducer,
    error : errorReducer,
    mess : messReducer,
    search: searchReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(socketMiddleware, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
