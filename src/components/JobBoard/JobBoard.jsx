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

  // Converts Date to MM/DD/YYY format
  // const date = new Date(`${jobItem && jobItem[0].date}`);	
	// const formattedDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
	// console.log(formattedDate);

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
            {job.service} | July 1, 2022 | ${job.pay}
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
