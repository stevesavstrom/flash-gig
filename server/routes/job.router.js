const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all jobs to display on job board
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("In GET all jobs");
  const query = `SELECT * FROM job ORDER BY "date" ASC`;
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

module.exports = router;
