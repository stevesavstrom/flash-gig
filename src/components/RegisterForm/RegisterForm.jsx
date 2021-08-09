import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './RegisterForm.css';

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  button: {
    width: "100px",
    padding: "10px",
    margin: "3px",
  },
  text: {
    width: "100%",
    margin: "3px",
  },
  box: {
    margin: "30px",
  },
  select: {
    width: "100%",
    marginBottom: "7px",
  },
  registrationInput: {
    marginBottom: "7px",
    width: "100%",
  }
});

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [bio, setBio] = useState('');
  const errors = useSelector((store) => store.errors);
  const serviceList = useSelector((store) => store.ServiceReducer);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_SERVICE" });
  }, []);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        email: email,
        service: service,
        bio: bio,
      },
    });
  }; // end registerUser

  return (
    
    <form className="registerFormPanel" onSubmit={registerUser}>
      <h2>Sign Up</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="username"
            variant="outlined"
            label="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
            className={classes.registrationInput}
            type="password"
            name="password"
            variant="outlined"
            label="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="firstName">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="firstName"
            variant="outlined"
            label="First Name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="lastName"
            variant="outlined"
            label="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="city"
            variant="outlined"
            label="City"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="state"
            variant="outlined"
            label="State"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="email"
            variant="outlined"
            label="Email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      {/* <div>
        <label htmlFor="service">
          <input
            className="registrationInput"
            type="text"
            name="service"
            placeholder="Service"
            value={service}
            required
            onChange={(event) => setService(event.target.value)}
          />
        </label>
      </div> */}
      <FormControl className={classes.select}>
<InputLabel htmlFor="service-native-simple">Service</InputLabel>
      <Select
          className={classes.select}
          value={service}
          inputProps={{
            name: 'age',
            id: 'service-native-simple',
          }}
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
        <label htmlFor="bio">
          <TextField
            className={classes.registrationInput}
            type="text"
            name="bio"
            variant="outlined"
            placeholder="Tell a little about yourself"
            value={bio}
            required
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
      </div> 
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
