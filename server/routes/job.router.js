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
  `SELECT *, venue, service  
  FROM job
  JOIN venue ON venue.id = job.venue_id
  JOIN service ON service.id = job.service_id
  ORDER BY "date" DESC;`;
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

// GET job by ID to display job details. User clicks on details button and will be directed to job details view.
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const detailsId = req.params.id;
  console.log("In GET details");
  console.log(`details id`, detailsId);
  // This query returns all details to be displayed on details page.
  const query = `SELECT headline, date, venue_id, hours, pay, service_id
	FROM job
	WHERE job.id = $1;`;
  pool
    .query(query, [detailsId])
    .then((result) => {
      console.log(`GET details by ID working`);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(
        "Error GET details by ID not working - check job router",
        error
      );
      res.sendStatus(500);
    });
});

// POST a job to the job board
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
  // endpoint functionality
});

module.exports = router;
