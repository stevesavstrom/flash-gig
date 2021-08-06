import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './JobForm.css';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
      {/* <img className="illustration" src="images/illustration1.png"></img> */}
      <h2>Post a Job</h2>
      <div className="textField">
          <TextField
            className="jobInput"
            id="outlined-basic"
            label="Headline"
            variant="outlined"
            type="text"
            name="headline"
            value={headline}
            required
            onChange={(event) => setHeadline(event.target.value)}
          />
      </div>
      <div className="textField">
        <TextField
            className="jobInput"
            id="outlined-basic"
            label="Date"
            variant="outlined"
            type="text"
            name="date"
            value={date}
            required
            onChange={(event) => setDate(event.target.value)}
          />
      </div>
      <div className="textField">
        <label htmlFor="venue">
        <TextField
            className="jobInput"
            id="outlined-basic"
            label="Venue"
            variant="outlined"
            type="text"
            name="venue"
            value={venue}
            required
            onChange={(event) => setVenue(event.target.value)}
          />
        </label>
      </div>
      <div className="textField">
        <label htmlFor="hours">
        <TextField
            className="jobInput"
            id="outlined-basic"
            label="Hours"
            variant="outlined"
            type="text"
            name="hours"
            value={hours}
            required
            onChange={(event) => setHours(event.target.value)}
          />
        </label>
      </div>
      <div className="textField">
        <label htmlFor="pay">
        <TextField
            className="jobInput"
            id="outlined-basic"
            label="Pay"
            variant="outlined"
            type="text"
            name="pay"
            value={pay}
            required
            onChange={(event) => setPay(event.target.value)}
          />
        </label>
      </div>
      <div className="textField">
        <label htmlFor="service">
        <TextField
            className="jobInput"
            id="outlined-basic"
            label="Service Needed"
            variant="outlined"
            type="text"
            name="service"
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