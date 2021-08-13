import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import './UserPage.css';

// Material-UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// Dialog transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

// Green avatar badge for confirmed applicant
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1.3)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.8)',
      opacity: 0,
    },
  },
}))(Badge);
// end Green Avatar badge

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 120,
  },
}));
// End Material-UI

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const userJobItem = useSelector((store) => store.UserJobReducer);
  const userApplicationItem = useSelector((store) => store.UserApplicationReducer);
  const classes = useStyles();

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [email, setEmail] = useState(user.email);
  const [service, setService] = useState(user.service);
  const [bio, setBio] = useState(user.bio);

    // Dialog Form
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleFormOpen = () => {
      setOpenDialog(true);
    };

    const handleFormClose = () => {
      event.preventDefault();

      dispatch({
        type: 'EDIT_PROFILE',
        payload: {
          firstName: firstName,
          lastName: lastName,
          city: city,
          state: state,
          email: email,
          service: service,
          bio: bio,
        },
      });
      setOpenDialog(false);
    };

    // Dialog Alert
    const [open, setOpen] = React.useState(false);

    // This is for the selected job to be deleted (dialog modal)
    const [deleteID, setDeleteId] = useState('');
  
    const handleClickOpen = (jobId) => {
      console.log('This is Open jobId', jobId);
      setDeleteId(jobId)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  // Star rating widget
  const [value, setValue] = React.useState(5);

  useEffect(() => {
    dispatch({
      type: "GET_USER_JOB",
    });
    dispatch({
      type: "GET_USER_APPLICATION",
    });
    console.log(`User Job Item:`, userJobItem);
  }, []);

  const handleApplicationDetails = (details) => {
    console.log('Details', details);
    dispatch({ type: "GET_APPLICATION_DETAILS", payload: details.id });
    history.push(`application/${details.id}`);
  };

  const handleDelete = (deleteItem) => {
    // handleClick();
    console.log(`Delete item`, deleteItem);
    dispatch({ type: 'DELETE_JOB', payload: deleteItem })
    setOpen(false);
  }

  // Convert date to mm/dd/yyyy
	function prettyDate(unformattedDate) {
		const dateString = new Date(unformattedDate);
		const year = dateString.getFullYear();
		let month = (1 + dateString.getMonth()).toString() ;
		let day = dateString.getDate().toString();
		month = month.length === 1 ? '0' + month : month;
		day = day.length === 1 ? '0' + day : day;
		return month + '-' + day + '-' + year;
	} //end prettyDate

  // Display today's date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="profile">
      {/* User profile */}
      {/* <p>
        Welcome Back, {user.first_name}! Today is {today}{" "}
      </p> */}
      <div className="profileContainer">
        <h2 className="profileName">
          {user.first_name} {user.last_name}
        </h2>

        {/* User Avatar */}
        <img className="avatar" src={user.photo}></img>

        {/* Active Green Badge */}
        <div className="ring-container">
          <div className="ringring"></div>
          <div className="circle"></div>
        </div>

        {/* Star Rating */}
        <Box component="fieldset" mb={1} borderColor="transparent">
          <Rating name="read-only" value={value} readOnly />
        </Box>

        {/* User Stats Card */}
        <ul className="card__info">
          <li>
            <span className="card__info__stats">{userJobItem.length}</span>
            <span>posted</span>
          </li>
          <li>
            <span className="card__info__stats">{userApplicationItem.length}</span>
            <span>applied</span>
          </li>
          <li>
            <span className="card__info__stats">7</span>
            <span>reviews</span>
          </li>
        </ul>

        {/* Chip Group */}
        <Chip
          label={user.service}
          variant="outlined"
          icon={<CameraAltOutlinedIcon/>}
        />
        <Chip 
        label={user.city} 
        variant="outlined"
        icon={<LocationOnIcon/>}
         />
        {/* <Chip label={user.state} variant="outlined" /> */}

        {/* User Bio */}
        <Typography className="bioText" variant="subtitle1" gutterBottom>
          {user.bio}
        </Typography>

        <Button onClick={handleFormOpen} className="drawerLink" to="/">
          Edit Profile
        </Button>
      </div>

      {/* Section: Users' posted jobs */}
      {/* <div className="userJobBoardContainer"> */}
      <Typography className="postedJobsHeader" variant="h5" gutterBottom>
        My Posted Jobs
      </Typography>
      {userJobItem.map((job, index) => {
        return (
          <div className="userJobCard" key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={job.image}
                  title="Job Card"
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {job.service} | {prettyDate(job.date)} | ${job.pay}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2">
                    {job.venue}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {job.headline}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  onClick={() => handleApplicationDetails(job)}
                  size="small"
                  style={{ color: "#172536" }}
                >
                  Applicants
                </Button>
                <Button
                  onClick={() => handleClickOpen(job.id)}
                  size="small"
                  style={{ color: "#172536" }}
                >
                  Delete
                </Button>
                <Button size="small" style={{ color: "#172536" }}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}

      {/* Section: Jobs user has applied for */}
      <Typography className="postedJobsHeader" variant="h5" gutterBottom>
        Jobs I Applied For
      </Typography>

      {userApplicationItem.map((application, index) => {
        return (
          <div className="userApplicationCard" key={index}>
            <List className={classes.list}>
              <ListItem alignItems="flex-start">
                {/* Conditionally displays green avatar badge on confirmed applicants */}
                {application.status === "Confirmed" && (
                  <ListItemAvatar>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={application && application.photo}
                      />
                    </StyledBadge>
                  </ListItemAvatar>
                )}
                {/* Conditionally displays standard avatar badge on applied applicants */}
                {application.status === "Applied" && (
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={application && application.photo}
                    />
                  </ListItemAvatar>
                )}
                {/* Displays remaining applicant information */}
                <ListItemText
                  primary={
                    <p>
                      <strong>Status:</strong>{" "}
                      {application && application.status}{" "}
                    </p>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                          Application submitted to <br></br> {" "}
                          <strong>{application && application.first_name}{" "} 
                          {application && application.last_name}</strong> for a wedding on <strong>{prettyDate(application && application.date)}</strong> at <strong>{application && application.venue}</strong>. The gig pays <strong>${application && application.pay}</strong> for <strong>{application && application.hours} hours</strong> of work.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </List>

            {/* <div className="jobItem">
              <div className="buttonGroup">
                <AssignmentTurnedInOutlinedIcon
                  className="icon"
                  style={{ fontSize: 70, color: "#172536" }}
                />
              </div>
              <h1 className="statusText">
                <strong>{application.status}</strong>
              </h1>
              <h3>{application.headline}</h3>
              <p>
                <strong>Application ID:</strong> {application.id}{" "}
              </p>
              <p>
                <strong>Job ID:</strong> {application.job_id}{" "}
              </p>
              <p>
                <strong>Hours:</strong> {application.hours}{" "}
              </p>
              <p>
                <strong>Pay:</strong> ${application.pay}{" "}
              </p>
            </div> */}
            
          </div>
        );
      })}

      {/* Dialog component for DELETE Exists Outside .map */}
      {/* Dialog component uses state to capture job id -- review above */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete job?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This job will permanently be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(deleteID)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Form for EDIT Profile */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        onClose={handleFormClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            color="primary"
            name="firstName"
            label="First Name"
            value={firstName}
            required
            fullWidth
            onChange={(event) => setFirstName(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="lastName"
            label="Last Name"
            value={lastName}
            required
            fullWidth
            onChange={(event) => setLastName(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="city"
            label="City"
            value={city}
            required
            fullWidth
            onChange={(event) => setCity(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="state"
            label="State"
            value={state}
            required
            fullWidth
            onChange={(event) => setState(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="email"
            label="Email"
            value={email}
            required
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="email"
            label="Service"
            value={service}
            required
            fullWidth
            onChange={(event) => setService(event.target.value)}
          />

          <TextField
            type="text"
            color="primary"
            name="bio"
            label="Bio"
            value={bio}
            required
            fullWidth
            multiline
            rows={3}
            onChange={(event) => setBio(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// this allows - us to use <App /> in index.js
export default UserPage;



