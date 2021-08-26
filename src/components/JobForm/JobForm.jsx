import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './JobForm.css';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  select: {
    marginBottom: "7px",
    width: "100%",
  },
  label: {
    marginLeft: "14px",
  },
  jobPostInput: {
    marginBottom: "7px",
    width: "100%",
  }
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

  const serviceList = useSelector((store) => store.ServiceReducer);
  const venueList = useSelector((store) => store.VenueReducer);

  const classes = useStyles();
  // const errors = useSelector((store) => store.errors);

  useEffect(() => {
    dispatch({ type: "GET_SERVICE" });
    dispatch({ type: "GET_VENUE" });
  }, []);

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

      {/* Headline Input */}
      <div className="textField">
        <TextField
          className={classes.jobPostInput}
          id="outlined-basic"
          label="Headline"
          variant="outlined"
          type="text"
          name="headline"
          value={headline}
          autocomplete="off"
          required
          onChange={(event) => setHeadline('Photographer needed! Client wants to add photo to video package!')}
        />
      </div>

      {/* Date input */}
      <div className="textField">
        <TextField
          className={classes.jobPostInput}
          id="outlined-basic"
          // label="Date"
          variant="outlined"
          type="date"
          name="date"
          value={date}
          autocomplete="off"
          required
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {/* Venue Input Select Menu */}
      <FormControl className={classes.select}>
        <InputLabel className={classes.label} htmlFor="service-native-simple">
          Venue
        </InputLabel>
        <Select
          className={classes.select}
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
          variant="outlined"
        >
          {venueList.map((venue) => {
            return (
              <MenuItem key={venue.id} value={venue.id}>
                {venue.venue}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* Hours Input */}
      <div className="textField">
        <label htmlFor="hours">
          <TextField
            className={classes.jobPostInput}
            id="outlined-basic"
            label="Hours"
            variant="outlined"
            type="text"
            name="hours"
            value={hours}
            autocomplete="off"
            required
            onChange={(event) => setHours('8')}
          />
        </label>
      </div>

      {/* Pay Input */}
      <div className="textField">
        <label htmlFor="pay">
          <TextField
            className={classes.jobPostInput}
            id="outlined-basic"
            label="Pay"
            variant="outlined"
            type="text"
            name="pay"
            value={pay}
            autocomplete="off"
            required
            onChange={(event) => setPay('2000')}
          />
        </label>
      </div>

      {/* Service Input Select Menu */}
      <FormControl className={classes.select}>
        <InputLabel className={classes.label} htmlFor="service-native-simple">
          Service
        </InputLabel>
        <Select
          className={classes.select}
          value={service}
          onChange={(event) => setService(event.target.value)}
          variant="outlined"
        >
          {serviceList.map((service) => {
            return (
              <MenuItem key={service.id} value={service.id}>
                {service.service}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div>
        <input className="btn" type="submit" name="submit" value="Post" />
      </div>
    </form>
  );
}

export default JobForm;