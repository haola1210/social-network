import { all } from 'redux-saga/effects'

import { watchSession } from './sessionSaga'
import { watchLogin } from "./loginSaga"

export default function* rootSaga(){
    yield all([
        watchSession(),
        watchLogin(),
    ])
}