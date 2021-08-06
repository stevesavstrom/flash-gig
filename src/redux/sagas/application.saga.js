import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* applicationSaga(){
    yield takeEvery('POST_APPLICATION', postApplication);
}

function* postApplication(action) {
// POST an application to the APPLICATION table
    try {
        yield call(axios.post, '/api/application', action.payload);
        yield put({ type: 'SET_APPLICATION' });
    }catch (error){
        console.log(`Error POSTing application to APPLICATION table from application.saga.js`, error);
    }
}

export default applicationSaga;