import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* jobDetailsSaga(){
    yield takeEvery('GET_JOB_DETAILS', fetchJobDetails);
}

function* fetchJobDetails(action) {
    try {
        const response = yield axios.get(`/api/job/${action.payload}`);
        console.log('Job Details:', response.data);
        yield put({ type: 'SET_JOB_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Error GETting jobs client side', error);
    }
}

export default jobDetailsSaga;