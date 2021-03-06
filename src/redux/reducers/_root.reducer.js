import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import JobReducer from './job.reducer';
import UserJobReducer from './userJob.reducer';
import UserApplicationReducer from './userApplication.reducer';
import JobDetailsReducer from './jobDetails.reducer';
import ApplicationDetailsReducer from './applicationDetails.reducer';
import ApplicationReducer from './application.reducer';
import ServiceReducer from './service.reducer';
import VenueReducer from './venue.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  JobReducer,
  UserJobReducer,
  UserApplicationReducer,
  JobDetailsReducer,
  ApplicationDetailsReducer,
  ApplicationReducer,
  ServiceReducer,
  VenueReducer,
});

export default rootReducer;
