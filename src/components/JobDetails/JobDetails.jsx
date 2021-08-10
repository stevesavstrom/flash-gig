import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./JobDetails.css";

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function JobDetails() {
	const jobDetails = useSelector((store) => store.JobDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	// console.log(`This is jobDetails`, jobDetails);

	const history = useHistory();


	const handleBack = (event) => {
    	event.preventDefault();
    	history.push(`/job`);
  	};

	const [message, setMessage] = useState('');
 
	useEffect(() => {
		dispatch({ type: "GET_JOB_DETAILS", payload: id });
	}, []);

	const postApplication = (event) => {
		event.preventDefault();
	
		dispatch({
		  type: 'POST_APPLICATION',
		  payload: {
			job_id: id,
			message: message,
		  },
		});
		history.push('/job');
	  }; // end postApplication

	// console.log('***id', id);

	// Convert date to mm/dd/yyyy
	function prettyDate(unformattedDate) {
		const dateString = new Date(unformattedDate);
		const year = dateString.getFullYear();
		let month = (1 + dateString.getMonth()).toString() ;
		let day = dateString.getDate().toString();
		month = month.length === 1 ? '0' + month : month;
		day = day.length === 1 ? '0' + day : day;
		return month + '-' + day + '-' + year;
	} //end prettyDate

	return (
		<div className="detailsMain">
		<div className="detailsContainer">
		<h4>{jobDetails && jobDetails[0].headline} </h4>
    	<img className="jobBoardImage" src={jobDetails && jobDetails[0].image}></img>
		<p><strong>Date:</strong> {prettyDate(jobDetails && jobDetails[0].date)} </p>
    	<p><strong>Venue:</strong> {jobDetails && jobDetails[0].venue} </p>
		<p><strong>Hours:</strong> {jobDetails && jobDetails[0].hours} </p>
		<p><strong>Pay:</strong> ${jobDetails && jobDetails[0].pay} </p>
		<p><strong>Service Needed:</strong> {jobDetails && jobDetails[0].service} </p>
    	<p><strong>Venue Description:</strong> {jobDetails && jobDetails[0].description}</p>

		<button className="jobDetailsButton" onClick={handleBack}>
          Back
        </button>
		</div>

		{/* Application form starts here */}
		<form className="applyFormPanel" onSubmit={postApplication}>
      <h2>Apply Now</h2>

      <div className="textField">
          <TextField
            className="jobInput"
            id="outlined-multiline-static"
            label="Write a message and then apply!"
			multiline rows={5}
            variant="outlined"
            type="text"
            name="message"
            value={message}
            required
            onChange={(event) => setMessage(event.target.value)}
          />
      </div>
      
      <div>

        <input 
        className="btn" 
        type="submit" 
        name="submit" 
        value="Apply" 
        />
      </div>
    </form>
		</div>


		

	)
}

export default JobDetails;
