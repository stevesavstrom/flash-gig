import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './RegisterForm.css';

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
  const dispatch = useDispatch();

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
          <input
            className="registrationInput"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            className="registrationInput"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="firstName">
          <input
            className="registrationInput"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          <input
            className="registrationInput"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          <input
            className="registrationInput"
            type="text"
            name="city"
            placeholder="City"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="state">
          <input
            className="registrationInput"
            type="text"
            name="state"
            placeholder="State"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          <input
            className="registrationInput"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
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
      </div>
      <div>
        <label htmlFor="bio">
          <input
            className="registrationInput"
            type="text"
            name="bio"
            placeholder="Bio (optional)"
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
