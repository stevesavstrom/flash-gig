import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function JobBoard(){
	const dispatch = useDispatch();
	const jobItem = useSelector(store => store.JobReducer);

	useEffect(() => {
		dispatch({
		  type: 'GET_JOB'
		})
	  }, []);

	return (
		<div className="container">
			<h2>All of the available jobs can be seen here:</h2>

			{jobItem.map(job => {
        return (
          <ul key= {job.id}>
            <li> {job.headline} </li>
          </ul>
        );
      })}

		</div>
	)

}

export default JobBoard;
