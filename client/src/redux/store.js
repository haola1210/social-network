import {
    createStore,
    applyMiddleware,
    combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";

import { authReducer } from "./auth/authReducer"
import { sessionReducer } from "./session/sessionReducer"
import { loginReducer } from "./login/loginReducer"
import rootSaga from "../saga/rootSaga"
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    jwt: authReducer,
    session : sessionReducer,
    login: loginReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware,)
)

sagaMiddleware.run(rootSaga)

export default store
