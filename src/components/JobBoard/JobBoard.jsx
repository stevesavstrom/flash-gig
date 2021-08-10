import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MapContainer from '../MapContainer/MapContainer';
import './JobBoard.css';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function JobBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const jobItem = useSelector((store) => store.JobReducer);

  // Loads and displays all jobs in job table
  useEffect(() => {
    dispatch({
      type: "GET_JOB",
    });
    console.log(jobItem);
  }, []);

  // View Job Details by Job ID on click
  const handleDetails = (details) => {
    console.log('Details', details);
    dispatch({ type: "GET_JOB_DETAILS", payload: details.id });
    history.push(`details/${details.id}`);
  };

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

  return (
    <div className="jobBoardContainer">
      
      {/* Map */}
      <MapContainer />

      {/* Job Board Header */}
      <h2 className="jobBoardHeader">Available Jobs</h2>

      {/* Job List */}
      {jobItem.map((job, index) => {
       return (<div className="jobCard" key={index}>
       <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={job.image}
            title="Job Card"
          />
          <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {job.service} | {prettyDate(job.date)} | ${job.pay}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
            {job.venue} 
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
            {job.headline}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => handleDetails(job)} 
          size="small"
          style={{color: "#172536" }}
          endIcon={< UnfoldMoreIcon />}
           >
          Learn More
          </Button>
        </CardActions>
        </Card>
        </div>)
      })}
    </div>
  );
}

export default JobBoard;
