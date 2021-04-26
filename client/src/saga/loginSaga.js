import { call, put, takeEvery, all, take } from 'redux-saga/effects'

import { 
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_START,
    LOGIN_FAILURE,
    LOGIN_GOOGLE,
    LOGIN_GOOGLE_SUCCESS,
    LOGIN_GOOGLE_START,
    LOGIN_GOOGLE_FAILURE,
} from '../redux/login/loginActionType'
import {
    SET_JWT,
} from '../redux/session/sessionActionType'
import {
    KEEP_SESSION,
    KEEP_GOOGLE_SESSION,
} from "../redux/session/sessionActionType"
import axios from 'axios'

export function* workerLogin(action){
    try {
        const { account } = action.payload
        yield put({ type: LOGIN_START })
    
        yield console.log(`running workerLogin`)
        yield console.log(account.username)
    
        // login here
        // geting tokenId from db here
        const { data } = yield axios.post(`http://localhost:4000/auths/local`, { 
            username: account.username, 
            password: account.password 
        })
        let { code, message } = data

        if (code === 404) { throw new Error(message) }
        if (code === 200) {

            let { token, googleId } = data.data
            token = {...token, tokenId: token.refreshToken, userId: googleId}
            yield console.log(data)
            
            // setting token to local here
            yield console.log(`setting SET_JWT_LOCAL_STORAGE`)
            yield console.log(token)
            yield put({ type: SET_JWT, payload: {token} })
            yield put({ type : LOGIN_SUCCESS })
            
            // get user from token here
            yield put({ type : KEEP_SESSION })

        }
    } catch (error) {
        
    }

}

export function* workerLoginGoogle(action){
    try {
        // const { user, token } = action.payload
        let { user, token } = action.payload
        token = {...token, userId: user.googleId}
        user = {...user, 
            password: "123",
            tokenId: token.tokenId
        }
        const { googleId } = user
        yield put({ type: LOGIN_GOOGLE_START })

        yield console.log(`running workerLoginGoogle`)
        yield console.log(user, token)
        yield console.log(action.payload)

        yield console.log(`setting SET_JWT_LOCAL_STORAGE`)
        yield put({ type: SET_JWT, payload: {token} })

        yield console.log(`finding isExisting with ${googleId}`)
        const found = yield axios.get(`http://localhost:4000/auths/google/${googleId}`)
        
        const { data, error } = found;
        yield console.log(`found`)
        yield console.log(data)

        if (found.data.code === 200) {
            yield put({ type : LOGIN_GOOGLE_SUCCESS })
            yield put({ type : KEEP_GOOGLE_SESSION })
        }
        else if (found.data.code === 404) {
            const response = yield axios.post(`http://localhost:4000/auths/google`, { googleUser: user })
            yield console.log(`creating`)
            yield console.log(response)
        }
        if (error) { throw new Error(error.message) }
            
    } catch (error) {
        yield console.log(error)
        yield put({ type: KEEP_GOOGLE_SESSION })
        yield put({type : LOGIN_GOOGLE_FAILURE, payload : error})
    }
    


}

export function* watchLogin(){
    yield takeEvery(LOGIN, workerLogin)
    yield takeEvery(LOGIN_GOOGLE, workerLoginGoogle)
}