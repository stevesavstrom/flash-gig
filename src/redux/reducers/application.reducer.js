const ApplicationReducer = (state = [], action) => {
	switch (action.type) {
	  case "SET_APPLICATION":
		return action.payload;
	  default:
		return state;
	}
  };
  
export default ApplicationReducer;