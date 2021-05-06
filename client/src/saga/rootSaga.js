import { all } from 'redux-saga/effects'

import { watchSession } from './sessionSaga'
import { watchSignin } from "./signinSaga"
import { watchGroups } from "./groupSaga"

export default function* rootSaga(){
    yield all([
        watchSession(),
        watchSignin(),
        watchGroups(),
    ])
}