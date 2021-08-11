import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editProfileSaga (){
	yield takeEvery('EDIT_PROFILE', editProfile);
}

function* editProfile (action){
	try {
		yield call(axios.put, `/api/user/`, action.payload);
		console.log(`What is in the edit PUT payload`, action.payload);
		yield put({type: "FETCH_USER" });
	} catch(error){
		console.log(`problem editing profile info`, error);
	}
}

export default editProfileSaga;