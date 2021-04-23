import { put, takeEvery } from 'redux-saga/effects'
import { GET_JWT } from "../redux/auth/authActionType"
import { FETCH_SESSION } from "../redux/session/sessionActionType"


export const KEEP_SESSION = "KEEP_SESSION"

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

export function* watchKeepSession(){
    yield takeEvery(KEEP_SESSION, workerKeepSession)
}
