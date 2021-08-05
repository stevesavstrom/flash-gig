import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* applicationDetailsSaga(){
    yield takeEvery('GET_APPLICATION_DETAILS', fetchApplicationDetails);
}

function* fetchApplicationDetails(action) {
    try {
        const response = yield axios.get(`/api/application/${action.payload}`);
        console.log('Application Details:', response.data);
        yield put({ type: 'SET_APPLICATION_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Error GETting application details client side', error);
    }
}

export default applicationDetailsSaga;