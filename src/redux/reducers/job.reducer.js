const JobReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOB":
      return action.payload;
    default:
      return state;
  }
};

export default JobReducer;
