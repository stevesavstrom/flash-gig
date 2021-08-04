import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteJobSaga () {
    yield takeEvery('DELETE_JOB', deleteJob);
}

function* deleteJob (action){
    try {
        yield call(axios.delete, `/api/job/${action.payload}`);
        console.log(`DELETE payload`, action.payload);
        yield put({ type: 'GET_USER_JOB' });
    } catch(error){
        console.log(`Problem DELETING job`, error);
    }
}

export default deleteJobSaga;