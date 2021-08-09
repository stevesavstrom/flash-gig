import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* venueSaga(){
    yield takeEvery('GET_VENUE', fetchVenue);
}

function* fetchVenue() {
    try {
        const response = yield axios.get('/api/venue');
        console.log(response);
        yield put({ type: 'SET_VENUE', payload: response.data});
    } catch (error) {
        console.log('Error GETting venues on Saga', error);
    }
}

export default venueSaga;