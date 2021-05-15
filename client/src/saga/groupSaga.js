import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import axios from '../utils/axios.manual'

import {  
    LIST_GROUP,
    LIST_GROUP_FAILED,
    LIST_GROUP_SUCCESS,
    SET_GROUP,
    UNSET_GROUP,
    // SET_GROUP_FAILED,
    // SET_GROUP_SUCCESS,

} from "../redux/group/groupActionType"

function* workerListGroup(action){
    try {
        
        const response = yield axios.get("/groups/")
        if (response.data.code === 200) {
            
            const groups = response.data.data.map(group => {
                return {
                    _id: group._id,
                    name: group.name,
                }
            })
            
            yield put({ type: LIST_GROUP_SUCCESS, payload: { listGroup : groups }})
            
        }
        else {throw new Error(response.data.error)}

    } catch (error) {
        console.log(error)
        yield put({ 
            type : LIST_GROUP_FAILED,
            payload : {
                error
            }
        })
    }
}

// function* workerSetGroup(action){
//     try {

//         const { currentGroup } = action.payload

//         yield put({ type: SET_GROUP_SUCCESS, payload: { currentGroup }})
        
//     } catch (error) {
//         console.log(error)
//         yield put({ 
//             type : SET_GROUP_FAILED,
//             payload : {
//                 error
//             }
//         })
//     }

// }

export function* watchGroups(action){
    yield takeEvery(LIST_GROUP, workerListGroup)
    // yield takeEvery(SET_GROUP, workerSetGroup)
}