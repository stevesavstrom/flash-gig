import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* serviceSaga(){
    yield takeEvery('GET_SERVICE', fetchService);
}

function* fetchService() {
    try {
        const response = yield axios.get('/api/service');
        console.log(response);
        yield put({ type: 'SET_SERVICE', payload: response.data});
    } catch (error) {
        console.log('Error GETting services client side', error);
    }
}

export default serviceSaga;