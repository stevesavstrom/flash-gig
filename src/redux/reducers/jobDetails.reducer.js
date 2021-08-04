const JobDetailsReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_JOB_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default JobDetailsReducer;
