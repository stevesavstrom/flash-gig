import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationDetails.css";

// Material-UI
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const useStyles = makeStyles((theme) => ({
	root: {
    justifyContent: 'center',
		alignItems: 'center',
		justify: 'center',
    },
	margin: {
	  margin: theme.spacing(1),
	},
	extendedIcon: {
	  marginRight: theme.spacing(1),
	},
  list: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  }));

function ApplicationDetails() {
	const applicationDetails = useSelector((store) => store.ApplicationDetailsReducer);
	const application = useSelector((store) => store.ApplicationReducer);

	const {id} = useParams();
  console.log('is this job id?', id);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

  // const [applicationStatus, setApplicationStatus] = useState(application.status);

	console.log(`***** This is applicationDetails *****`, applicationDetails);

	const handleBack = (event) => {
    	event.preventDefault();
    	history.push(`/user`);
  	};

	useEffect(() => {
		dispatch({ type: "GET_APPLICATION_DETAILS", payload: id });
	}, []);

	const handleConfirm = (application) => {
		console.log('*** This is handle application payload', application);
		dispatch({ type: 'CONFIRM_APPLICATION', payload: {application, id}})
    setOpen(false);
		// window.location.reload(false);
	}

	const handleReject = (application) => {
		console.log('*** This is handle reject payload', application);
		dispatch({ type: 'REJECT_APPLICATION', payload: application })
		window.location.reload(false);
	}

  // Dialog Alert
  const [open, setOpen] = React.useState(false);

  // This is for the selected application to be confirmed (dialog modal)
  const [confirmId, setConfirmId] = useState('');
    
  const handleClickOpen = (applicationId) => {
    console.log('This is Open applicationId', applicationId);
    setConfirmId(applicationId)
    setOpen(true);
    };
    
  const handleClose = () => {
    setOpen(false);
    };

	console.log(id);
	console.log(application);

	return (
    <div className="applicationDetailsContainer">
      <div className="applicationDetailsHeader">
        <h1>Application Details</h1>
        {applicationDetails.length < 1 && (
          <h3>
            Sorry! You have do not have any applicants for this job yet. Check
            back later!
          </h3>
        )}
        {applicationDetails.length >= 1 && (
          <h3>You have {applicationDetails.length} applicants for this job</h3>
        )}
      </div>

      {applicationDetails.map((application, index) => {
        return (
          <div className="applicationDetailsCard" key={index}>
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
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
              {application.status === "Applied" && (
                <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={application && application.photo}
                    />
                </ListItemAvatar>
              )}
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
                        <strong>
                          New Application from{" "}
                          {application && application.first_name}{" "}
                          {application && application.last_name}!{" "}
                        </strong>{" "}
                        <br></br>
                        {application && application.message}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <div className="buttonGroup">
                {application.status === "Applied" && (
                  <Box textAlign="center" m={1}>
                    <Button
                      onClick={() => handleClickOpen(application.id)}
                      size="small"
                      style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                    >
                      Confirm
                    </Button>
                  </Box>
                )}
                {application.status === "Applied" && (
                  <Box textAlign="center" m={1}>
                    <Button
                      onClick={() => handleReject(application)}
                      size="small"
                      style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                    >
                      Reject
                    </Button>
                  </Box>
                )}

                {application.status === "Confirmed" && (
                  <Box textAlign="center" m={1}>
                    <Button
                      onClick={() => handleReject(application)}
                      size="small"
                      style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </div>
              <Divider variant="middle" component="li" />
            </List>
          </div>
        );
      })}

      <Box textAlign="center" m={3}>
        <Button
          onClick={handleBack}
          size="medium"
          style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
          className="applicationDetailsButton"
        >
          Back to Profile
        </Button>
      </Box>

      {/* Dialog component for CONFIRM Exists Outside .map */}
      {/* Dialog component uses state to capture job id -- review above */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Applicant?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The job will be confirmed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleConfirm(confirmId)}
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


// This is the old card system for mapping through the applicants
// It was replaced by the avatar list items above.
// This is still an option if needed.

{/* <div className="applicationItem">
              <div className="buttonGroup">
                <LinkedCameraOutlinedIcon
                  className="icon"
                  style={{ fontSize: 50, color: "#172536" }}
                />
              </div>
              <h3>
                New Application from {application && application.first_name}{" "}
                {application && application.last_name}{" "}
              </h3>
              <p>
                <strong>Application ID:</strong> {application && application.id}{" "}
              </p>
              <p>
                <strong>Job ID:</strong> {application && application.job_id}{" "}
              </p>
              <p>
                <strong>Applicant ID:</strong>{" "}
                {application && application.applicant_id}{" "}
              </p>
              <p>
                <strong>Message:</strong> {application && application.message}{" "}
              </p>
              <p>
                <strong>Status:</strong> {application && application.status}{" "}
              </p>
              {application.status === "Confirmed" && (
                <p>
                  You're confirmed to work with{" "}
                  {application && application.first_name}!{" "}
                  <strong>Reach out by email to discuss details:</strong>{" "}
                  {application && application.email}{" "}
                </p>
              )} */}

            {/* Conditional rendering for confirm and reject buttons */}
            {/* {application.status === "Applied" && (
                <Box textAlign="center" m={1}>
                  <Button
                    onClick={() => handleConfirm(application)}
                    size="small"
                    style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                  >
                    Confirm
                  </Button>
                </Box>
              )}
              {application.status === "Applied" && (
                <Box textAlign="center" m={1}>
                  <Button
                    onClick={() => handleReject(application)}
                    size="small"
                    style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                  >
                    Reject
                  </Button>
                </Box>
              )}

              {application.status === "Confirmed" && (
                <Box textAlign="center" m={1}>
                  <Button
                    onClick={() => handleReject(application)}
                    size="small"
                    style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </div> */}

export default ApplicationDetails;