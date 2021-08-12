const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all jobs to display on job board
// JOINS with SERVICE and VENUE table to render venue name and service by id.
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("In GET all jobs");
  const query = 
  `SELECT
  job.id,
  job.headline, 
  job.date, 
  job.hours, 
  job.pay, 
  venue.venue, 
  venue.description, 
  venue.image,
  venue.location, 
  service.service,
  "user".first_name,
  "user".last_name,
  "user".city,
  "user".state,
  "user".bio,
  "user".photo
  FROM job
  JOIN venue ON venue.id = job.venue_id
  JOIN service ON service.id = job.service_id
  JOIN "user" ON "user".id = job.user_id
  ORDER BY "date" ASC;`;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET all jobs not working - check job router", error);
      res.sendStatus(500);
    });
});

// GET all jobs by user id
// Displays jobs a user has posted on UserPage dashboard
router.get("/userJob", rejectUnauthenticated, (req, res) => {
  console.log("In GET jobs by user ID");
  console.log('user', req.user);
  const query = 
  `SELECT
  job.id,
  job.headline, 
  job.date, 
  job.hours, 
  job.pay, 
  venue.venue, 
  venue.description, 
  venue.image, 
  service.service
  FROM job
  JOIN venue ON venue.id = job.venue_id
  JOIN service ON service.id = job.service_id
  WHERE user_id = $1
  ORDER BY "date" DESC;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      console.log(`Result:`, result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET all jobs not working - check job router", error);
      res.sendStatus(500);
    });
});

// GET job by ID to display job details. 
// User clicks on details button and will be directed to job details view.
router.get("/:id", rejectUnauthenticated, (req, res) => {
  console.log("In GET job details");
  console.log(`Job detail ID`, req.params.id);
  // This query returns all details to be displayed on details page.
  const query = 
  `SELECT
  job.headline, 
  job.date, 
  job.hours, 
  job.pay,
  job.user_id,
  venue.venue, 
  venue.description,
  "user".first_name,
  "user".last_name,
  "user".city,
  "user".state,
  "user".bio,
  "user".photo,
  venue.image, 
  service.service
  FROM job
  JOIN "user" ON "user".id = job.user_id
  JOIN venue ON venue.id = job.venue_id
  JOIN service ON service.id = job.service_id
  WHERE job.id = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      console.log(`GET details by ID working`, result.row);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET details by ID not working - check job router", error);
      res.sendStatus(500);
    });
});

// POST a job to the job board
// Action takes place on JobForm component by completing form and clicking 
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.body:", req.body);
  const addItemQuery = `INSERT INTO job (user_id, headline, date, venue_id, hours, pay, service_id)
   VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(addItemQuery, [
      req.user.id,
      req.body.headline,
      req.body.date,
      req.body.venue,
      req.body.hours,
      req.body.pay,
      req.body.service
    ])
    .then((result) => {
      console.log("New job is is", result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`ERROR adding job: ${error}`);
      res.sendStatus(500);
    });
});

// DELETE job by id (user can only delete jobs they have posted)
// Action takes place of UserPage component in Posted Jobs section -
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`Job being DELETED:`, req.params.id);
  const query = `DELETE from job WHERE id=$1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      console.log(`Successfully DELETED job from database`, result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`ERROR trying to DELETE job from database`, error);
      res.sendStatus(500);
    });
});

// EDIT job by id (user can only edit jobs they have created)
// Action takes place of UserPage component in Posted Jobs section
router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`Job being EDITED:`, req.params.id);

  const headline = req.body.headline;
  const date = req.body.date;
  const venue = req.body.venue_id;
  const hours = req.body.hours;
  const pay = req.body.pay;
  const service = req.body.service_id;

  const query = 
  `UPDATE "job" 
  SET "headline"=$1,
  "date"=$2,
  "hours"=$4,
  "pay"=$5,
  WHERE id=$8;`;

	pool
	  .query(query, [
      headline,
      date,
      hours,
      pay,
      req.params.id
    ])
	  .then((result) => {
		console.log("Updated job details with PUT", result);
		res.sendStatus(201);
	  })
	  .catch((error) => {
		console.log(`ERROR updating job info with PUT: ${error}`);
		res.sendStatus(500);
	  });
  });


module.exports = router;
