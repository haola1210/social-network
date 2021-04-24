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
    KEEP_SESSION
} from "../redux/session/sessionActionType"
import axios from 'axios'

export function* workerLogin(action){
    const { user } = action.payload
    yield put({ type: LOGIN_START })

    yield console.log(`running workerLogin`)
    yield console.log(user.username)
    yield console.log(user)

    // login here
    const { data } = yield axios.post(`http://localhost:4000/users/local`, { username: user.username, password: user.password })
    const { _id, } = data

    // geting tokenId from db here

    // setting token to local here
    
    // get user from token here
    

}

export function* workerLoginGoogle(action){
    try {
        // const { user, token } = action.payload
        let { user, token } = action.payload
        user = {...user, 
            password: "123",
            tokenId: token.tokenId
        }
        const { googleId } = user
        yield put({ type: LOGIN_GOOGLE_START })

        yield console.log(`running workerLoginGoogle`)
        yield console.log(user, token)

        console.log(`setting SET_JWT_LOCAL_STORAGE`)
        yield put({ type: SET_JWT, payload: {token} })

        console.log(`finding isExisting with ${googleId}`)
        const found = yield axios.get(`http://localhost:4000/users/google/${googleId}`)
        const { data, error } = found;
        console.log(`found`)
        console.log(data)

        if (found.data.code === 200) {
            yield put({ type : LOGIN_GOOGLE_SUCCESS })
            yield put({ type : KEEP_SESSION })
        }
        else if (found.data.code === 404) {
            const response = yield axios.post(`http://localhost:4000/users/google`, { googleUser: user })
            console.log(`creating`)
            console.log(response)
        }
        if (error) { throw new Error(error.message) }
            
    } catch (error) {
        console.log(error)
        // yield put({ type: KEEP_SESSION })
        yield put({type : LOGIN_GOOGLE_FAILURE, payload : error})
    }
    


}

export function* watchLogin(){
    yield takeEvery(LOGIN, workerLogin)
    yield takeEvery(LOGIN_GOOGLE, workerLoginGoogle)
}