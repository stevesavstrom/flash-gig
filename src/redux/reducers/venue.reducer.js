const VenueReducer = (state = [], action) => {
	switch (action.type) {
	  case "SET_VENUE":
		return action.payload;
	  default:
		return state;
	}
  };
  
export default VenueReducer;