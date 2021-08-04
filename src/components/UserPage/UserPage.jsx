import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import './UserPage.css';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


function UserPage() {
  const dispatch = useDispatch();
  const jobItem = useSelector((store) => store.JobReducer);
  const user = useSelector((store) => store.user);

  // Star rating widget
  const [value, setValue] = React.useState(5);

  useEffect(() => {
    dispatch({
      type: "GET_USER_JOB",
    });
    console.log(`Job Item:`, jobItem);
  }, []);

  return (
    <div className="profile">

    {/* Users profile */}
    <div className="profileContainer">
      <h2>{user.first_name} {user.last_name}</h2>
      <img className="avatar" src="images/avatar1.png"></img>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={value} readOnly />
      </Box>
      <Typography variant="h6" gutterBottom>{user.service} based in {user.city}</Typography>
      <Typography variant="h6" gutterBottom>About Me: {user.bio}</Typography>
      <Typography variant="h6" gutterBottom>Your ID is: {user.id}</Typography>
      </div>

      {/* Users posted jobs */}
      <div className="userJobBoardContainer">
      <Typography variant="h5" gutterBottom>Upcoming Jobs</Typography>
      {jobItem.map((job) => {
       return <div className="jobCard" key={job.id}>
      <div className="jobItem">
			<p><strong>Date:</strong> {job.date} </p>
      <p><strong>Venue:</strong> {job.venue} </p>
			<p><strong>Hours:</strong> {job.hours} </p>
			<p><strong>Pay:</strong> ${job.pay} </p>
			<p><strong>Service Needed:</strong> {job.service} </p>
      </div>
		</div>
      })}
      </div>


      <LogOutButton className="logoutButton" />
    
    </div>







  );
}

// this allows us to use <App /> in index.js
export default UserPage;
