import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import axios from '../utils/axios.manual'

import {
    SET_SESSION,
    CLEAR_SESSION,
    KEEP_SESSION,
    FETCHING_SESSION
} from '../redux/session/sessionActionType'


import { SIGN_OUT } from "../redux/signin/signinActionType"

function* workerClearSession(action){
    try {
        
        yield call({
            context: localStorage,
            fn: localStorage.removeItem
        }, "ACCESS_TOKEN")

        yield put({ type : CLEAR_SESSION })

    } catch (error) {
        console.log(error)        
    }
}

function* workerFetchSession(action){
    try {
        
        yield put({ type : FETCHING_SESSION })

        const jwt = yield call({
            context : localStorage,
            fn: localStorage.getItem
        }, "ACCESS_TOKEN")

        if(!jwt) throw new Error("No jwt for your old session")

        const response  = yield axios.post("/auths/keep-session", { jwt })
        if(response.data.error) throw response.data.error

        yield put({
            type : SET_SESSION,
            payload : { ...response.data }
        })


    } catch (error) {
        console.log(error)
        yield put({ type : SIGN_OUT })
    }
}

export function* watchSession(){ 
    yield takeLatest(SIGN_OUT, workerClearSession)
    yield takeLatest(KEEP_SESSION, workerFetchSession)
}
