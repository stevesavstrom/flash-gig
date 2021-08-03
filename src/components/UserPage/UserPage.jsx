import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome {user.first_name}!</h2>
      <h2>Located in {user.city}</h2>
      <h2>{user.service}</h2>
      <h2>Bio: {user.bio}</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="logoutButton" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
