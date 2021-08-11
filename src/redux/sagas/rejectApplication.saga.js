import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* rejectApplicationSaga (){
	yield takeEvery('REJECT_APPLICATION', rejectApplication);
}

function* rejectApplication (action){
	try {
		yield call(axios.put, `/api/application/reject/${action.payload.application}`, action.payload.application);
		console.log(`What is in the PUT payload`, action.payload);
		yield put({type: "GET_APPLICATION_DETAILS", payload: action.payload.id });
	} catch(error){
		console.log(`problem rejecting application`, error);
	}
}

export default rejectApplicationSaga;