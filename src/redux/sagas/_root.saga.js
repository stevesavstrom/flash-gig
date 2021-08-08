import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import jobSaga from './job.saga';
import postJobSaga from './postJob.saga';
import userJobSaga from './userJob.saga';
import userApplicationSaga from './userApplication.saga';
import deleteJobSaga from './deleteJob.saga';
import jobDetailsSaga from './jobDetails.saga';
import applicationDetailsSaga from './applicationDetails.saga';
import applicationSaga from './application.saga';
import confirmApplicationSaga from './confirmApplication.saga';
import serviceSaga from './service.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    jobSaga(),
    postJobSaga(),
    userJobSaga(),
    userApplicationSaga(),
    deleteJobSaga(),
    jobDetailsSaga(),
    applicationDetailsSaga(),
    applicationSaga(),
    confirmApplicationSaga(),
    serviceSaga(),
  ]);
}
