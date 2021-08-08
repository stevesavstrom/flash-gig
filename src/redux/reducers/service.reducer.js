const ServiceReducer = (state = [], action) => {
	switch (action.type) {
	  case "SET_SERVICE":
		return action.payload;
	  default:
		return state;
	}
  };
  
  export default ServiceReducer;