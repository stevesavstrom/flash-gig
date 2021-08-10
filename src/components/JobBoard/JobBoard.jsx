import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Map from '../GoogleMap/GoogleMap';
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

  useEffect(() => {
    dispatch({
      type: "GET_JOB",
    });
    console.log(jobItem);
  }, []);

  const handleDetails = (details) => {
    console.log('Details', details);
    dispatch({ type: "GET_JOB_DETAILS", payload: details.id });
    history.push(`details/${details.id}`);
  };

  return (
    <div className="jobBoardContainer">
      <MapContainer />
			{/* <Map /> */}
      <h2 className="jobBoardHeader">Available Jobs</h2>

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
            {job.service} | ${job.pay} | {job.hours} Hours
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
          <Button onClick={() => handleDetails(job)} size="small" color="primary" >
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

{/* <div className="jobCard" key={index}>
			<h2 className="jobBoardHeadline">{job.headline} </h2>
      <img className="jobBoardImage" src={job.image}></img>
			<p><strong>Date:</strong> {job.date} </p>
      <p><strong>Venue:</strong> {job.venue} </p>
			<p><strong>Hours:</strong> {job.hours} </p>
			<p><strong>Pay:</strong> ${job.pay} </p>
			<p><strong>Service Needed:</strong> {job.service} </p>
      <p>Posted by {job.first_name} {job.last_name}</p>
      
      {/* <p><strong>Venue Description:</strong> {job.description} </p> */}
		// 	<button className="detailsButton" onClick={() => handleDetails(job)}>More</button>
		// </div> */}
