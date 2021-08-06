import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import './UserPage.css';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userJobItem = useSelector((store) => store.UserJobReducer);
  const userApplicationItem = useSelector((store) => store.UserApplicationReducer);

  // Star rating widget
  const [value, setValue] = React.useState(5);

  useEffect(() => {
    dispatch({
      type: "GET_USER_JOB",
    });
    dispatch({
      type: "GET_USER_APPLICATION",
    });
    console.log(`User Job Item:`, userJobItem);
  }, []);

  const handleApplicationDetails = (details) => {
    console.log('Details', details);
    dispatch({ type: "GET_APPLICATION_DETAILS", payload: details.id });
    history.push(`application/${details.id}`);
  };

  const handleDelete = (deleteItem) => {
    console.log(`Delete item`, deleteItem);
    dispatch({ type: 'DELETE_JOB', payload: deleteItem })
  }

  return (
    <div className="profile">
    {/* Users profile */}
    <div className="profileContainer">
      <h2>{user.first_name} {user.last_name}</h2>
      <img className="avatar" src={user.photo}></img>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={value} readOnly />
      </Box>
      <Typography variant="h6" gutterBottom>{user.service} based in {user.city}</Typography>
      <Typography className="bioText" variant="subtitle1" gutterBottom>{user.bio}</Typography>
      {/* <Typography variant="h6" gutterBottom>Your ID is: {user.id}</Typography> */}
      </div>

      {/* Section: Users' posted jobs */}
      {/* <div className="userJobBoardContainer"> */}
      <Typography className="postedJobsHeader" variant="h5" gutterBottom>My Posted Jobs</Typography>
      {userJobItem.map((job, index) => {
       return <div className="userJobCard" key={index}>
      <div className="jobItem">
      <div className="buttonGroup">
      <CameraAltOutlinedIcon className="icon" style={{ fontSize: 70, color: '#172536'}} />
      </div>
      <h3>{job.headline}</h3>
      {/* <p><strong>ID:</strong> {job.id} </p> */}
			<p><strong>Date:</strong> {job.date} </p>
      <p><strong>Venue:</strong> {job.venue} </p>
			<p><strong>Hours:</strong> {job.hours} </p>
			<p><strong>Pay:</strong> ${job.pay} </p>
			<p><strong>Service Needed:</strong> {job.service} </p>
      <div className="buttonGroup">
      <button className="userJobButton" onClick={() => handleApplicationDetails(job)}>Applicants</button>
      <button className="userJobButton" onClick={ () => handleDelete(job.id)}>Delete</button>
      <button className="userJobButton">Edit</button>
      </div>
      </div>
		</div>
      })}
      {/* </div> */}

      {/* Section: Jobs user has applied for */}
      <Typography className="postedJobsHeader" variant="h5" gutterBottom>Jobs I Applied For</Typography>

      {userApplicationItem.map((application, index) => {
       return <div className="userApplicationCard" key={index}>
      <div className="jobItem">
      <div className="buttonGroup">
      <AssignmentTurnedInOutlinedIcon className="icon" style={{ fontSize: 70, color: '#172536'}} />
      </div>
      <h1 className="statusText"><strong>{application.status}</strong></h1>
      <h3>{application.headline}</h3>
      <p><strong>Application ID:</strong> {application.id} </p>
			<p><strong>Job ID:</strong> {application.job_id} </p>
			<p><strong>Hours:</strong> {application.hours} </p>
			<p><strong>Pay:</strong> ${application.pay} </p>
      </div>
		</div>
      })}
      <LogOutButton className="logoutButton" />
      
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
