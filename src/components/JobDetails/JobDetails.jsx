import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./JobDetails.css";

function JobDetails() {
	const jobDetails = useSelector((store) => store.JobDetailsReducer);
	console.log(`This is jobDetails`, jobDetails);

	// const history = useHistory();

	// const handleBack = (event) => {
    // 	event.preventDefault();
    // 	history.push(`/`);
  	// };

	return (
		<div className="detailsContainer">
		<h4>{jobDetails && jobDetails[0].headline} </h4>
    	<img className="jobBoardImage" src={jobDetails && jobDetails[0].image}></img>
		<p><strong>Date:</strong> {jobDetails && jobDetails[0].date} </p>
    	<p><strong>Venue:</strong> {jobDetails && jobDetails[0].venue} </p>
		<p><strong>Hours:</strong> {jobDetails && jobDetails[0].hours} </p>
		<p><strong>Pay:</strong> ${jobDetails && jobDetails[0].pay} </p>
		<p><strong>Service Needed:</strong> {jobDetails && jobDetails[0].service} </p>
    	<p><strong>Venue Description:</strong> {jobDetails && jobDetails[0].description} </p>
		</div>

	)
}

export default JobDetails;
