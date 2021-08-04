import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [value, setValue] = React.useState(5);

  return (
    <div className="profileContainer">
      <h2>{user.first_name} {user.last_name}</h2>
      <img className="avatar" src="images/avatar1.png"></img>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={value} readOnly />
      </Box>
      <Typography variant="h6" gutterBottom>{user.service} based in {user.city}</Typography>
      <Typography variant="h6" gutterBottom>About Me: {user.bio}</Typography>
      <Typography variant="h6" gutterBottom>Your ID is: {user.id}</Typography>
      <LogOutButton className="logoutButton" />
    </div>





  );
}

// this allows us to use <App /> in index.js
export default UserPage;
