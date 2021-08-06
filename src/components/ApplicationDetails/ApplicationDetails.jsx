import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import "./ApplicationDetails.css";

// Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
        justifyContent: 'center',
		alignItems: 'center',
		justify: 'center',
    },
	margin: {
	  margin: theme.spacing(1),
	},
	extendedIcon: {
	  marginRight: theme.spacing(1),
	},
  }));

function ApplicationDetails() {
	const applicationDetails = useSelector((store) => store.ApplicationDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	console.log(`***** This is applicationDetails *****`, applicationDetails);

	const handleBack = (event) => {
    	event.preventDefault();
    	history.push(`/user`);
  	};

	useEffect(() => {
		dispatch({ type: "GET_APPLICATION_DETAILS", payload: id });
	}, []);

	console.log('***id', id);

	return (
		<div className="applicationDetailsContainer">
			<h1>Application Details</h1>

		{applicationDetails.map((application, index) => {
    	return <div className="applicationDetailsCard" key={index}>
		<div className="applicationItem">
		<h3>📸 New Application from {application && application.first_name} {application && application.last_name} </h3>
    	<p><strong>Application ID:</strong> {application && application.id} </p>
		<p><strong>Job ID:</strong> {application && application.job_id} </p>
    	<p><strong>Applicant ID:</strong> {application && application.applicant_id} </p>
		<p><strong>Message:</strong> {application && application.message} </p>
		<p><strong>Status:</strong> {application && application.status} </p>

		<Box textAlign='center' m={1}>
		<Button size="small" style={{backgroundColor: '#172536', color: '#FFFFFF'}}>
		Confirm
		</Button>
		</Box>

		<Box textAlign='center' m={1}>
		<Button size="small" style={{backgroundColor: '#172536', color: '#FFFFFF'}}>
		Reject
		</Button>
		</Box>

    	</div>
		</div>
      })}
		{/* <button className="applicationDetailsButton" onClick={handleBack}>
          Back
        </button> */}

		<Box textAlign='center' m={3}>
		<Button 
		onClick={handleBack}
		size="medium" 
		style={{backgroundColor: '#172536', color: '#FFFFFF'}}
		className="applicationDetailsButton">
          Back to Profile
        </Button>
		</Box>

		</div>
	)
}

export default ApplicationDetails;