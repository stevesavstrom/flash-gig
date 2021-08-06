import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userApplicationSaga(){
    yield takeEvery('GET_USER_APPLICATION', fetchUserApplication);
}

function* fetchUserApplication() {
    try {
        const response = yield axios.get('/api/application/');
        console.log(response);
        yield put({ type: 'SET_USER_APPLICATION', payload: response.data});
    } catch (error) {
        console.log('Error GETting user applications error from Saga', error);
    }
}

export default userApplicationSaga;