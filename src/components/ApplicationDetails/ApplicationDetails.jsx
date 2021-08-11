// ApplicationDetails shows all applications for a specific job
// ApplicationDetails allows a user to review, confirm, and reject applicants for a specific job
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationDetails.css";

// Material-UI imports
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
import Slide from '@material-ui/core/Slide';
// end Material-UI imports

// Dialog alert transition
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

// Material-UI styles
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
  // end Material-UI styles

function ApplicationDetails() {
	const applicationDetails = useSelector((store) => store.ApplicationDetailsReducer);
	const application = useSelector((store) => store.ApplicationReducer);
	const {id} = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

  // Fetches application details on page load
  useEffect(() => {
		dispatch({ type: "GET_APPLICATION_DETAILS", payload: id });
	}, []);

  // Back button returns user to UserPage
	const handleBack = (event) => {
    	event.preventDefault();
    	history.push(`/user`);
  	};

  // Dispatches 'Confirmed' status on dialog click
	const handleConfirm = (application) => {
		console.log('*** This is handle application payload', application);
		dispatch({ type: 'CONFIRM_APPLICATION', payload: {application, id}})
    setOpen(false);
	}

  // Dispatches 'Rejected' status on dialog click
	const handleReject = (application) => {
		console.log('*** This is handle reject payload', application);
		dispatch({ type: 'REJECT_APPLICATION', payload: {application, id}})
		window.location.reload(false);
	}

  // Dialog Alert for Confirm and Reject applicants
  const [open, setOpen] = React.useState(false);

  // This is for the selected application to be confirmed (dialog modal)
  const [confirmId, setConfirmId] = useState('');
  const [rejectId, setRejectId] = useState('');
  
  // Dialog alert to CONFIRM APPLICANT is opened and confirmation message appears
  const handleClickOpen = (applicationId) => {
    console.log('This is open confirm dialog by applicationId', applicationId);
    setConfirmId(applicationId)
    setOpen(true);
    };

  // Dialog alert to REJECT APPLICANT is opened and confirmation message appears
  const handleRejectClickOpen = (applicationId) => {
    console.log("This is open reject dialog by applicationId", applicationId);
    setRejectId(applicationId);
    setOpen(true);
  };
  
  // Dialog alert closes when 'No' is clicked
  const handleClose = () => {
    setOpen(false);
    };

	return (
    <div className="applicationDetailsContainer">
      <div className="applicationDetailsHeader">
        {/* Application Details Header */}
        <h1>Application Details</h1>
        {/* Conditional message for 0 applicants */}
        {applicationDetails.length < 1 && (
          <h3>
            Sorry! You have do not have any applicants for this job yet. Check
            back later!
          </h3>
        )}
        {/* Conditional message for 1 or more applicants */}
        {applicationDetails.length >= 1 && (
          <h3>You have {applicationDetails.length} applicants for this job</h3>
        )}
      </div>
      {/* Maps through applicants and displays applicants in list on DOM */}
      {applicationDetails.map((application, index) => {
        return (
          <div className="applicationDetailsCard" key={index}>
            <List className={classes.root}>
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
                {/* Conditionally displays confirm button for applicant status: applied */}
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
                {/* Conditionally displays reject button for applicant status: applied */}
                {application.status === "Applied" && (
                  <Box textAlign="center" m={1}>
                    <Button
                      onClick={() => handleRejectClickOpen(application.id)}
                      size="small"
                      style={{ backgroundColor: "#172536", color: "#FFFFFF" }}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
                {/* Conditionally displays reject button for applicant status: applied */}
                {application.status === "Confirmed" && (
                  <Box textAlign="center" m={1}>
                    <Button
                      onClick={() => handleRejectClickOpen(application.id)}
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
    {/* end .map of application */}

    {/* Back button returns user to UserPage */}
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
      {/* Dialog component uses state to capture application and job id -- review above */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
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
          {/* Clicking 'NO' closes dialog alert */}
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          {/* Clicking 'YES' dispatches PUT to confirm applicant */}
          <Button
            onClick={() => handleConfirm(confirmId)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog component for REJECT Exists Outside .map */}
      {/* Dialog component uses state to capture application and job id -- review above */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reject Applicant?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The applicant will be rejected and removed from the list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Clicking 'NO' closes dialog alert */}
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          {/* Clicking 'NO' dispatches PUT to reject applicant */}
          <Button
            onClick={() => handleReject(rejectId)}
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

export default ApplicationDetails;