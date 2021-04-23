import { call, put, takeEvery, select } from 'redux-saga/effects'

import {
    FETCH_SESSION,
    FETCH_SESSION_START,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE
} from '../redux/session/sessionActionType'

export function* workerFetchSession(action){
    
    try{
        //get token in store
        const token = yield select(state => state.jwt.token)
        console.log("saga log: ", token)
        // start fetch session (user info)
        yield put({type : FETCH_SESSION_START})
        //ajax
        // const response = yield axios.get(`http://localhost:4000/users/token/${token}`, {
        //     headers: {
        //       'Authorization': `Bearer ${token}` 
        //     }
        // })
        // console.log(response)
        // //save to store
        // let { user, error } = response.data
        // if(user){
        //     const handshake = {
        //         auth : {
        //             userId : user._id,
        //             // add token later
        //         }
        //     }

        //     yield put({
        //         type : FETCH_SESSION_SUCCESS,
        //         payload : user
        //     })

        //     yield put({
        //         type : INIT_SOCKET
        //     })

        // }
        // if(error) throw new Error(error.message)
    } catch (error) {
        console.log(error.message)
        yield put({
            type : FETCH_SESSION_FAILURE,
            payload : error
        })
    }

}

export function* watchFetchSession(){
    yield takeEvery(FETCH_SESSION, workerFetchSession)
}