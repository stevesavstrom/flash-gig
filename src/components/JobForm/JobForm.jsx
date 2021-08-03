import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './JobForm.css';

function JobForm() {
  const [headline, setHeadline] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [hours, setHours] = useState('');
  const [pay, setPay] = useState('');
  const [service, setService] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  // const errors = useSelector((store) => store.errors);

  const postJob = (event) => {
    event.preventDefault();

    dispatch({
      type: 'POST_JOB',
      payload: {
        headline: headline,
        date: date,
        venue: venue,
        hours: hours,
        pay: pay,
        service: service,
      },
    });
    history.push('/job');
  }; // end postJob


  return ( 
    <form className="jobFormPanel" onSubmit={postJob}>
      <h2>Post a Job</h2>
      <div>
        <label htmlFor="headline">
          <input
            className="jobInput"
            type="text"
            name="headline"
            placeholder="Headline"
            value={headline}
            required
            onChange={(event) => setHeadline(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="date">
          <input
            className="jobInput"
            type="text"
            name="date"
            placeholder="Date"
            value={date}
            required
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="venue">
          <input
            className="jobInput"
            type="text"
            name="venue"
            placeholder="Venue"
            value={venue}
            required
            onChange={(event) => setVenue(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="hours">
          <input
            className="jobInput"
            type="text"
            name="hours"
            placeholder="Hours"
            value={hours}
            required
            onChange={(event) => setHours(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="pay">
          <input
            className="jobInput"
            type="text"
            name="pay"
            placeholder="Pay"
            value={pay}
            required
            onChange={(event) => setPay(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="service">
          <input
            className="jobInput"
            type="text"
            name="service"
            placeholder="Service Needed"
            value={service}
            required
            onChange={(event) => setService(event.target.value)}
          />
        </label>
      </div>
      <div>

        <input 
        className="btn" 
        type="submit" 
        name="submit" 
        value="Post" 
        />
      </div>
    </form>
  );
}

export default JobForm;