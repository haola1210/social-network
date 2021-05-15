import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import axios from '../utils/axios.manual'

import {  
    SIGN_IN,
    SIGN_IN_GOOGLE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from "../redux/signin/signinActionType"

import {
    SET_SESSION
} from "../redux/session/sessionActionType"

function* workerSigninLocal(action){
    try {
        yield put({ type : SIGN_IN_START })
        const { username, password } = action.payload
        if(!username && !password) throw new Error("Fields are lack!")
        
        const response = yield axios.post("/auths/login", {
            username, 
            password
        })

        console.log(response.data)
        if(response.data.error) throw response.data.error

        const { user, jwt } = response.data
        //luu jwt vao localStorage
        yield call({
            context : localStorage,
            fn: localStorage.setItem
        }, "ACCESS_TOKEN" , jwt)

        // luu user va jwt vao redux store
        yield put({
            type : SET_SESSION,
            payload : {
                user,
                jwt
            }
        })

        yield put({ type : SIGN_IN_SUCCESS })

    } catch (error) {
        console.log(error)
        yield put({ 
            type : SIGN_IN_FAILURE,
            payload : {
                error
            }
        })
    }

}

function* workerSigninGoogle(action){
    try {
        yield put({ type: SIGN_IN_START })
        if(!action.payload.user) throw new Error("Login with Google failed")

        const { name, email, imageUrl } = action.payload.user
        const response = yield axios.post("/auths/login",{
            name,
            email,
            imageUrl
        })

        console.log(response.data)
        if(response.data.error) throw response.data.error


        const { user, jwt } = response.data
        //luu jwt vao localStorage
        yield call({
            context : localStorage,
            fn: localStorage.setItem
        }, "ACCESS_TOKEN" ,jwt)

        // luu user va jwt vao redux store
        yield put({
            type : SET_SESSION,
            payload : {
                user,
                jwt
            }
        })

        yield put({ type : SIGN_IN_SUCCESS })


    } catch (error) {
        console.log(error)
        yield put({
            type : SIGN_IN_FAILURE,
            payload : {
                error
            }
        })        
    }
}

export function* watchSignin(action){
    yield takeLatest(SIGN_IN, workerSigninLocal)
    yield takeLatest(SIGN_IN_GOOGLE, workerSigninGoogle)
}