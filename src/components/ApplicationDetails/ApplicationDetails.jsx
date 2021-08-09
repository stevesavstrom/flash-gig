import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import "./ApplicationDetails.css";

// Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';

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
	const application = useSelector((store) => store.ApplicationReducer);

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

	const handleConfirm = (application) => {
		console.log('*** This is handle application payload', application);
		dispatch({ type: 'CONFIRM_APPLICATION', payload: application })
		window.location.reload(false);
	}

	const handleReject = (application) => {
		console.log('*** This is handle reject payload', application);
		dispatch({ type: 'REJECT_APPLICATION', payload: application })
		window.location.reload(false);
	}

	console.log('***id', id);

	return (
		<div className="applicationDetailsContainer">
			<h1>Application Details</h1>
			{applicationDetails.length < 1 &&
			<p>Sorry! You have do not have any applicants for this job yet. Check back later!</p>
			}
			{applicationDetails.length >= 1 &&
			<p>You have {applicationDetails.length} applicants for this job</p>
			}
		{applicationDetails.map((application, index) => {
    	return <div className="applicationDetailsCard" key={index}>
		<div className="applicationItem">
		<div className="buttonGroup">
      <LinkedCameraOutlinedIcon className="icon" style={{ fontSize: 50, color: '#172536'}} />
      </div>
		<h3>New Application from {application && application.first_name} {application && application.last_name} </h3>
    	<p><strong>Application ID:</strong> {application && application.id} </p>
		<p><strong>Job ID:</strong> {application && application.job_id} </p>
    	<p><strong>Applicant ID:</strong> {application && application.applicant_id} </p>
		<p><strong>Message:</strong> {application && application.message} </p>
		<p><strong>Status:</strong> {application && application.status} </p>

		{/* Conditional rendering for confirm and reject buttons */}
		{application.status === 'Applied' &&
   		<Box textAlign='center' m={1}>
		   <Button 
		   onClick={ () => handleConfirm(application)} 
		   size="small" 
		   style={{backgroundColor: '#172536', color: '#FFFFFF'}}>
		   Confirm
		   </Button>
		   </Box>
		}

		{application.status === 'Confirmed' &&
   		<Box textAlign='center' m={1}>
		   <Button 
		   onClick={ () => handleReject(application)} 
		   size="small" 
		   style={{backgroundColor: '#172536', color: '#FFFFFF'}}>
		   Cancel Booking
		   </Button>
		   </Box>
		}

		{application.status === 'Applied' &&
		<Box textAlign='center' m={1}>
		   <Button
		   onClick={ () => handleReject(application)} 
		   size="small" 
		   style={{backgroundColor: '#172536', color: '#FFFFFF'}}>
		   Reject
		   </Button>
		   </Box>
		}


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