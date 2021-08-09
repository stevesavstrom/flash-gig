import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* confirmApplicationSaga (){
	yield takeEvery('CONFIRM_APPLICATION', confirmApplication);
}

function* confirmApplication (action){
	try {
		yield call(axios.put, `/api/application/${action.payload.id}`, action.payload);
		console.log(`What is in the PUT payload`, action.payload.id);
		yield put({type: "GET_APPLICATION_DETAILS", payload: action.payload.id });
	} catch(error){
		console.log(`problem confirming application`, error);
	}
}

export default confirmApplicationSaga;