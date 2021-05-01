import { all } from 'redux-saga/effects'

import { watchSession } from './sessionSaga'
import { watchSignin } from "./signinSaga"

export default function* rootSaga(){
    yield all([
        watchSession(),
        watchSignin()
    ])
}