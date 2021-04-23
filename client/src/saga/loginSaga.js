import { call, put, takeEvery, all, take } from 'redux-saga/effects'

import { 
    LOGIN,
    LOGIN_GOOGLE,
} from '../redux/login/loginActionType'
import {
    SET_JWT,
} from '../redux/auth/authActionType'

export function* workerLogin(action){
    const { user, token } = action.payload
    yield console.log(`running workerLogin`)
    yield console.log(user)
    yield console.log(token)
}

export function* workerLoginGoogle(action){
    const { user, token } = action.payload
    yield console.log(`running workerLoginGoogle`)
    yield console.log(user, token)

    const response = yield put({ type: SET_JWT, payload: {token} })
    console.log(`setting SET_JWT_LOCAL_STORAGE`)
    console.log(response)
    
}

export function* watchLogin(){
    yield takeEvery(LOGIN, workerLogin)
    yield takeEvery(LOGIN_GOOGLE, workerLoginGoogle)
}