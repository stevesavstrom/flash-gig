const ApplicationDetailsReducer = (state = 0, action) => {
	switch (action.type) {
	  case "SET_APPLICATION_DETAILS":
		return action.payload;
	  default:
		return state;
	}
  };
  
export default ApplicationDetailsReducer;