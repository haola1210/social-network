import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

import {
    GET_JWT, 
    SET_JWT, 
    CLEAR_JWT,
    GET_JWT_LOCAL_STORAGE,
    SET_JWT_LOCAL_STORAGE,
    CLEAR_JWT_LOCAL_STORAGE, 
    KEEP_SESSION,
    FETCH_SESSION,
    FETCH_SESSION_START,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE,

} from '../redux/session/sessionActionType'

const ACCESS_TOKEN = "ACCESS_TOKEN"
const TOKEN_ID = "TOKEN_ID"

export function* workerJwt(action){
    const accessToken = yield call({context: localStorage, fn: localStorage.getItem}, ACCESS_TOKEN)
    const tokenId = yield call({context: localStorage, fn: localStorage.getItem}, TOKEN_ID)
    
    console.log(`running workerJwt`)

    yield put({
        type : GET_JWT_LOCAL_STORAGE,
        payload : { accessToken, tokenId, }
    })
}

export function* workerSetJwt(action){
    const { token } = action.payload
    const { accessToken, tokenId } = token
    console.log(`running workerSetJwt`)

    yield call({context: localStorage, fn: localStorage.setItem}, ACCESS_TOKEN, accessToken)
    yield call({context: localStorage, fn: localStorage.setItem}, TOKEN_ID, tokenId)
    yield put({ type : SET_JWT_LOCAL_STORAGE, payload: {token} })
}

export function* workerClearJWt(action){
    yield call({ context : localStorage, fn : localStorage.removeItem }, ACCESS_TOKEN)
    yield call({ context : localStorage, fn : localStorage.removeItem }, TOKEN_ID)

    yield put({type : CLEAR_JWT_LOCAL_STORAGE})
}

export function* workerFetchSession(action){
    
    try{
        //get token in store
        const { accessToken: tokenId } = yield select(state => state.jwt)

        yield console.log(`running workerFetchSession`)

        console.log(`getting access token, id from store`)
        // start fetch session (user info)
        yield put({type : FETCH_SESSION_START})
        //ajax
        const response = yield axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`)
        console.log(response)
        if (response.status === 200) {
            const { 
                sub, //googleId
                hd, // domain name of email address
                email, // email address
                name, 
                family_name, 
                given_name, 
                picture, 
            } = response.data;
            const user = { 
                sub, //googleId
                hd, // domain name of email address
                email, // email address
                name, 
                family_name, 
                given_name, 
                picture, 
            }
            
            //save user to store
            yield put({
                type : FETCH_SESSION_SUCCESS,
                payload : {user}
            })
            
            // yield put({
            //     type : INIT_SOCKET
            // })

        }
        else { throw new Error("Failed to fetch user to store")}

    } catch (error) {
        console.log(error.message)
        yield put({
            type : FETCH_SESSION_FAILURE,
            payload : {error}
        })
    }

}


export function* workerKeepSession(action){
    try{
        // store jwt to state from localStorage
        yield put({type : GET_JWT})
        //store user info to state
        yield put({ type : FETCH_SESSION })

    } catch(err) {
        console.log(err)
    }
}

export function* watchSession(){
    yield takeEvery(GET_JWT, workerJwt)
    yield takeEvery(SET_JWT, workerSetJwt)
    yield takeEvery(CLEAR_JWT, workerClearJWt)
    yield takeEvery(FETCH_SESSION, workerFetchSession)
    yield takeEvery(KEEP_SESSION, workerKeepSession)
}
