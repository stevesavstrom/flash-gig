import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./JobDetails.css";

function JobDetails() {
	const jobDetails = useSelector((store) => store.JobDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	console.log(`This is jobDetails`, jobDetails);

	const history = useHistory();

	const handleBack = (event) => {
    	event.preventDefault();
    	history.push(`/job`);
  	};

	useEffect(() => {
		dispatch({ type: "GET_JOB_DETAILS", payload: id });
	}, []);

	console.log('***id', id);

	return (
		<div className="detailsContainer">
		<h4>{jobDetails && jobDetails[0].headline} </h4>
    	<img className="jobBoardImage" src={jobDetails && jobDetails[0].image}></img>
		<p><strong>Date:</strong> {jobDetails && jobDetails[0].date} </p>
    	<p><strong>Venue:</strong> {jobDetails && jobDetails[0].venue} </p>
		<p><strong>Hours:</strong> {jobDetails && jobDetails[0].hours} </p>
		<p><strong>Pay:</strong> ${jobDetails && jobDetails[0].pay} </p>
		<p><strong>Service Needed:</strong> {jobDetails && jobDetails[0].service} </p>
    	<p><strong>Venue Description:</strong> {jobDetails && jobDetails[0].description}</p>
		<button className="detailsButton" onClick={handleBack}>
          Back
        </button>
		</div>

	)
}

export default JobDetails;
