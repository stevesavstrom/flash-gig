import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userJobSaga(){
    yield takeEvery('GET_USER_JOB', fetchUserJob);
}

function* fetchUserJob() {
    try {
        const response = yield axios.get('/api/job/userJob');
        console.log(response);
        yield put({ type: 'SET_USER_JOB', payload: response.data});
    } catch (error) {
        console.log('Error GETting user jobs client side', error);
    }
}

export default userJobSaga;