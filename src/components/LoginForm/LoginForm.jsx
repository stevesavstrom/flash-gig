import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

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


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="loginFormPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>

          <TextField
            className={classes.registrationInput}
            variant="outlined"
            type="text"
            name="username"
            label="Username"
            autocomplete="off"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.registrationInput}
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            autocomplete="off"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div className="loginViewButton">
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
      <div className="registerLink">
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/');
          }}
        >
          Register
        </button>
      </div>
      
    </form>
  );
}

export default LoginForm;
