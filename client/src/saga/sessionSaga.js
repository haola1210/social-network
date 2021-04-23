import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

import {
    FETCH_SESSION,
    FETCH_SESSION_START,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE
} from '../redux/session/sessionActionType'

export function* workerFetchSession(action){
    
    try{
        //get token in store
        const { accessToken: token, tokenId } = yield select(state => state.jwt)

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
                payload : user
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
            payload : error
        })
    }

}

export function* watchFetchSession(){
    yield takeEvery(FETCH_SESSION, workerFetchSession)
}