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

export function* watchJwt(){
    yield takeEvery(GET_JWT, workerJwt)
    yield takeEvery(SET_JWT, workerSetJwt)
    yield takeEvery(CLEAR_JWT, workerClearJWt)
}