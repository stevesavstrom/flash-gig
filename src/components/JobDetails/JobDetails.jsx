import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./JobDetails.css";

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  list: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'flex',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function JobDetails() {
	const jobDetails = useSelector((store) => store.JobDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	// console.log(`This is jobDetails`, jobDetails);

	const classes = useStyles();


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
		<Typography variant="h4" gutterBottom>{jobDetails && jobDetails[0].headline} </Typography>
    	<img className="jobDetailsImage" src={jobDetails && jobDetails[0].image}></img>
		<Typography variant="subtitle1" gutterBottom><strong>About the Wedding</strong><br></br>This event is at {jobDetails && jobDetails[0].venue} on {prettyDate(jobDetails && jobDetails[0].date)}. I am looking for a {jobDetails && jobDetails[0].service} for {jobDetails && jobDetails[0].hours} hours. The pay is ${jobDetails && jobDetails[0].pay}</Typography>
		{/* <p><strong>Date:</strong> {prettyDate(jobDetails && jobDetails[0].date)} </p>
    	<p><strong>Venue:</strong> {jobDetails && jobDetails[0].venue} </p>
		<p><strong>Hours:</strong> {jobDetails && jobDetails[0].hours} </p>
		<p><strong>Pay:</strong> ${jobDetails && jobDetails[0].pay} </p>
		<p><strong>Service Needed:</strong> {jobDetails && jobDetails[0].service} </p> */}
    	<Typography variant="subtitle1" gutterBottom><strong>Venue Description:</strong><br></br>{jobDetails && jobDetails[0].description}</Typography>

		<div className="posterProfile">
		<List className={classes.list}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={jobDetails && jobDetails[0].photo}/>
        </ListItemAvatar>
        <ListItemText
        //   primary="Posted by"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="subtitle1"
                className={classes.inline}
                color="textPrimary"
              >
                Posted by {jobDetails && jobDetails[0].first_name} {jobDetails && jobDetails[0].last_name} 
              </Typography>
              <Typography>
			  {jobDetails && jobDetails[0].bio}
			  </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
	  </List>
	  </div>
		
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
