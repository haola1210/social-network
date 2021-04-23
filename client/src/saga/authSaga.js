import { call, put, takeEvery, all, take } from 'redux-saga/effects'

import { 
    GET_JWT_LOCAL_STORAGE,
    GET_JWT, 
    SET_JWT_LOCAL_STORAGE,
    SET_JWT, 
    CLEAR_JWT_LOCAL_STORAGE, 
    CLEAR_JWT 
} from '../redux/auth/authActionType'

const ACCESS_TOKEN = "ACCESS_TOKEN"

export function* workerJwt(action){
    const jwt = yield call({context: localStorage, fn: localStorage.getItem}, ACCESS_TOKEN)
    console.log(jwt)
    yield put({
        type : GET_JWT_LOCAL_STORAGE,
        payload : jwt
    })
}

export function* workerSetJwt(action){
    const { token } = action.payload
    console.log(`running workerSetJwt`)
    const { accessToken } = token
    const jwt = yield call({context: localStorage, fn: localStorage.setItem}, ACCESS_TOKEN, accessToken)
    console.log(jwt)
    yield put({ type : SET_JWT_LOCAL_STORAGE})
}

export function* workerClearJWt(action){
    yield call({
        context : localStorage,
        fn : localStorage.removeItem
    }, ACCESS_TOKEN)
    yield put({type : CLEAR_JWT_LOCAL_STORAGE})
}

export function* watchJwt(){
    yield takeEvery(GET_JWT, workerJwt)
    yield takeEvery(SET_JWT, workerSetJwt)
    yield takeEvery(CLEAR_JWT, workerClearJWt)
}