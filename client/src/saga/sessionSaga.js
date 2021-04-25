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
    
    KEEP_GOOGLE_SESSION,
    FETCH_GOOGLE_SESSION,
    FETCH_GOOGLE_SESSION_START,
    FETCH_GOOGLE_SESSION_SUCCESS,
    FETCH_GOOGLE_SESSION_FAILURE,

    KEEP_ALL_SESSION,

} from '../redux/session/sessionActionType'

const ACCESS_TOKEN = "ACCESS_TOKEN"
const TOKEN_ID = "TOKEN_ID"
const USER_ID = "USER_ID"

export function* workerJwt(action){
    const accessToken = yield call({context: localStorage, fn: localStorage.getItem}, ACCESS_TOKEN)
    const tokenId = yield call({context: localStorage, fn: localStorage.getItem}, TOKEN_ID)
    const userId = yield call({context: localStorage, fn: localStorage.getItem}, USER_ID)
    
    console.log(`running workerJwt`)

    yield put({
        type : GET_JWT_LOCAL_STORAGE,
        payload : { accessToken, tokenId, userId}
    })
}

export function* workerSetJwt(action){
    const { token } = action.payload
    const { accessToken, tokenId, userId } = token
    yield console.log(`running workerSetJwt`)
    yield console.log(token)

    yield call({context: localStorage, fn: localStorage.setItem}, ACCESS_TOKEN, accessToken)
    yield call({context: localStorage, fn: localStorage.setItem}, TOKEN_ID, tokenId)
    if (userId) { 
        yield call({context: localStorage, fn: localStorage.setItem}, USER_ID, userId)
    }
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
        const { userId } = yield select(state => state.session)

        if (userId) { 

            yield console.log(`running workerFetchSession`)
            yield console.log(`getting access token, id from store`)
            yield console.log(`finding isExisting with ${userId}`)

            // start fetch session (user info)
            yield put({type : FETCH_SESSION_START})
            //ajax
            const response = yield axios.post(`http://localhost:4000/users/token/${userId}`)
                
            let { user, } = response.data.data
            console.log(response)
            if (user) {
                const {
                    googleId, 
                    username, 
                    email, 
                    name, firstName, lastName,
                    image, 
                } = user
                user = {
                    googleId, 
                    username, 
                    email, 
                    name, firstName, lastName,
                    image, 
                }
                console.log(`Get Token User`)
                yield console.log(user)

                //save user to store
                yield put({
                    type : FETCH_SESSION_SUCCESS,
                    payload : {user}
                })
                
                // yield put({
                //     type : INIT_SOCKET
                // })
            }

        }
        throw new Error("workerFetchSession Failed to Fetch User to Store")
    } catch (error) {
        console.log(error.message)
        yield put({
            type : FETCH_SESSION_FAILURE,
            payload : {error}
        })
    }

}

export function* workerFetchGoogleSession(action){
    
    try{
        //get token in store
        const { tokenId } = yield select(state => state.session)

        yield console.log(`running workerFetchGoogleSession`)
        yield console.log(`getting access token, id from store`)

        // start fetch session (user info)
        yield put({type : FETCH_GOOGLE_SESSION_START})
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
                domain: hd, // domain name of email address
                googleId: sub, //googleId
                email, // email address
                name, 
                lastName: family_name, 
                firstName: given_name, 
                image: picture, 
            }
            console.log(`Get Token User`)
            console.log(user)

            
            //save user to store
            yield put({
                type : FETCH_GOOGLE_SESSION_SUCCESS,
                payload : {user}
            })
            
            // yield put({
            //     type : INIT_SOCKET
            // })

        }
        else { throw new Error("workerFetchGoogleSession Failed to Fetch User to Store")}

    } catch (error) {
        console.log(error.message)
        yield put({
            type : FETCH_GOOGLE_SESSION_FAILURE,
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

    } catch(error) {
        console.log(error)
    }
}

export function* workerKeepGoogleSession(action){
    try{
        // store jwt to state from localStorage
        yield put({type : GET_JWT})
        //store user info to state
        yield put({ type : FETCH_GOOGLE_SESSION })

    } catch(err) {
        console.log(err)
    }
}

export function* workerKeepAllSession(action) {
    try {
        // store jwt to state from localStorage
        yield put({type : KEEP_SESSION})
        //store user info to state
        yield put({ type : KEEP_GOOGLE_SESSION })
    } catch (error) {
        console.log(error)
    }
}

export function* watchSession(){
    yield takeEvery(GET_JWT, workerJwt)
    yield takeEvery(SET_JWT, workerSetJwt)
    yield takeEvery(CLEAR_JWT, workerClearJWt)
    yield takeEvery(FETCH_SESSION, workerFetchSession)
    yield takeEvery(FETCH_GOOGLE_SESSION, workerFetchGoogleSession)
    yield takeEvery(KEEP_SESSION, workerKeepSession)
    yield takeEvery(KEEP_ALL_SESSION, workerKeepAllSession)
    yield takeEvery(KEEP_GOOGLE_SESSION, workerKeepGoogleSession)
}
