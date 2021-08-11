import React, {useEffect, useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import './UserPage.css';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

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
      <p>
        Welcome Back, {user.first_name}! Today is {today}{" "}
      </p>
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
        <ul class="card__info">
          <li>
            <span class="card__info__stats">{userJobItem.length}</span>
            <span>posted</span>
          </li>
          <li>
            <span class="card__info__stats">{userApplicationItem.length}</span>
            <span>applied</span>
          </li>
          <li>
            <span class="card__info__stats">20</span>
            <span>received</span>
          </li>
        </ul>

        {/* Chip Group */}
        <Chip
          label={user.service}
          variant="outlined"
          icon={<CameraAltOutlinedIcon />}
        />
        <Chip label={user.city} variant="outlined" />
        <Chip label={user.state} variant="outlined" />

        {/* User Bio */}
        <Typography className="bioText" variant="subtitle1" gutterBottom>
          {user.bio}
        </Typography>
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
            <div className="jobItem">
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
            </div>
          </div>
        );
      })}

      {/* Dialog Component Exists Outside .map */}
      {/* Dialog component uses state to capture job id -- review above */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete job?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The job will permanently be deleted.
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
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


{/* <div className="jobItem">
              <div className="buttonGroup">
                <CameraAltOutlinedIcon
                  className="icon"
                  style={{ fontSize: 70, color: "#172536" }}
                />
              </div>
              <h3>{job.headline}</h3>
              <Chip
                label={job.service}
                variant="outlined"
                icon={<CameraAltOutlinedIcon />}
              />
              <Chip label={job.venue} variant="outlined" />

              <p>
                <strong>Date:</strong>{" "}
                {new Date(job.date).toLocaleDateString("en-US")}{" "}
              </p> */}
            {/* <p><strong>Venue:</strong> {job.venue}{" "}</p> */}
            {/* <p>
                <strong>Hours:</strong> {job.hours}{" "}
              </p>
              <p>
                <strong>Pay:</strong> ${job.pay}{" "}
              </p> */}
            {/* <p><strong>Service Needed:</strong> {job.service}{" "}</p> */}

            {/* Button Group */}
            {/* <div className="buttonGroup">
                <button
                  className="userJobButton"
                  onClick={() => handleApplicationDetails(job)}
                >
                  Applicants
                </button> */}

            {/* Dialog for delete button */}
            {/* <button
                  className="userJobButton"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleClickOpen(job.id)}
                >
                  Delete
                </button>
                <button className="userJobButton">Edit</button>
              </div> */}



