import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editJobSaga (){
	yield takeEvery('EDIT_JOB', editJob);
}

function* editJob (action){
	try {
		yield call(axios.put, `/api/user/`, action.payload);
		console.log(`What is in the edit job PUT payload`, action.payload);
		yield put({type: "GET_USER_JOB" });
	} catch(error){
		console.log(`problem editing job details info`, error);
	}
}

export default editJobSaga;