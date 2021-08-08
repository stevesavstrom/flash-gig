import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Map from '../GoogleMap/GoogleMap';
import './JobBoard.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function JobBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const jobItem = useSelector((store) => store.JobReducer);

  useEffect(() => {
    dispatch({
      type: "GET_JOB",
    });
    console.log(jobItem);
  }, []);

  const handleDetails = (details) => {
    console.log('Details', details);
    dispatch({ type: "GET_JOB_DETAILS", payload: details.id });
    history.push(`details/${details.id}`);
  };

  return (
    <div className="jobBoardContainer">
			<Map />
      <h2>Available Jobs</h2>

      {jobItem.map((job, index) => {
       return (<div className="jobCard" key={index}>
			<h2 className="jobBoardHeadline">{job.headline} </h2>
      <img className="jobBoardImage" src={job.image}></img>
			<p><strong>Date:</strong> {job.date} </p>
      <p><strong>Venue:</strong> {job.venue} </p>
			<p><strong>Hours:</strong> {job.hours} </p>
			<p><strong>Pay:</strong> ${job.pay} </p>
			<p><strong>Service Needed:</strong> {job.service} </p>
      {/* <p><strong>Venue Description:</strong> {job.description} </p> */}
			<button className="detailsButton" onClick={() => handleDetails(job)}>More</button>
		</div>)
      })}
    </div>
  );
}

export default JobBoard;
