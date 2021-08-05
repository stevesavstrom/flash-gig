import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationDetails.css";

function ApplicationDetails() {
	const applicationDetails = useSelector((store) => store.ApplicationDetailsReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	console.log(`This is applicationDetails`, applicationDetails);

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


		<button className="applicationDetailsButton" onClick={handleBack}>
          Back
        </button>

		</div>

	)
}

export default ApplicationDetails;