const UserJobReducer = (state = [], action) => {
	switch (action.type) {
	  case "SET_USER_JOB":
		return action.payload;
	  default:
		return state;
	}
  };
  
  export default UserJobReducer;