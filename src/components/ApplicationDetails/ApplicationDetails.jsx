import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationDetails.css";

function ApplicationDetails() {
	const applicationDetails = useSelector((store) => store.ApplicationDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

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
    	<p><strong>Application ID:</strong> {application && application.id} </p>
		<p><strong>Job ID:</strong> {application && application.job_id} </p>
    	<p><strong>Applicant ID:</strong> {application && application.applicant_id} </p>
		<p><strong>Message:</strong> {application && application.message} </p>
		<p><strong>Status:</strong> {application && application.status} </p>
		<button>Confirm</button>
		<button>Reject</button>
    	</div>
		</div>
      })}


		<button className="applicationDetailsButton" onClick={handleBack}>
          Back
        </button>

		</div>

	)
}

export default ApplicationDetails;