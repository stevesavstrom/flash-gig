const UserApplicationReducer = (state = [], action) => {
	switch (action.type) {
	  case "SET_USER_APPLICATION":
		return action.payload;
	  default:
		return state;
	}
  };
  
export default UserApplicationReducer;