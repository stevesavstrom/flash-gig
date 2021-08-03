import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from '../GoogleMap/GoogleMap';
import './JobBoard.css';

function JobBoard() {
  const dispatch = useDispatch();
  const jobItem = useSelector((store) => store.JobReducer);

  useEffect(() => {
    dispatch({
      type: "GET_JOB",
    });
  }, []);

  return (
    <div className="jobBoardContainer">
			<Map />
      <h2>Available Jobs</h2>

      {jobItem.map((job) => {
       return <div className="jobCard" key={job.id}>
			<h4>{job.headline} </h4>
			<p><strong>Venue:</strong> {job.venue} </p>
			<p><strong>Hours:</strong> {job.hours} </p>
			<p><strong>Pay:</strong> ${job.pay} </p>
			<p><strong>Service Needed:</strong> {job.service} </p>
			<button className="applyButton">More</button>
		</div>
      })}
    </div>
  );
}

export default JobBoard;
