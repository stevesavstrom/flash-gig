import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postJobSaga(){
    yield takeEvery('POST_JOB', postJob);
}

function* postJob(action) {
// POST an item to the shelf
    try {
        yield call(axios.post, '/api/job', action.payload);
        yield put({ type: 'GET_JOB' });
    }catch (error){
        console.log(`Error POSTing job to JOB table from postJob.saga.js`, error);
    }
}

export default postJobSaga;