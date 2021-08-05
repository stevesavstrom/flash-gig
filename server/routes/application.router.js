const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET applications by job id
// Used for viewing a list of all applicants to a specific job posting
router.get("/:id", rejectUnauthenticated, (req, res) => {
	console.log("In GET applications by job ID");
	console.log(`Job detail ID`, req.params.id);
	const query = 
	`SELECT 
	application.id, 
	application.job_id, 
	application.applicant_id, 
	application.message, 
	application.status, 
	"user".first_name, 
	"user".last_name, 
	"user".city, 
	"user".state, 
	"user".email, 
	"user".bio
	FROM application
	JOIN "user" ON application.applicant_id = "user".id
	WHERE application.job_id = $1`;
	pool
	  .query(query, [req.params.id])
	  .then((result) => {
		console.log(`Result:`, result.rows);
		res.send(result.rows);
	  })
	  .catch((error) => {
		console.log("Error GET applications by job id not working - check application router", error);
		res.sendStatus(500);
	  });
  });

// POST a new application using the application form on the ApplicationForm component
router.post("/", rejectUnauthenticated, (req, res) => {
	console.log("req.body:", req.body);
	const query = `INSERT INTO job (job_id, applicant_id, message)
	 VALUES ($1, $2, $3);`;
	pool
	  .query(query, [
		req.body.job_id,
		req.user.id,
		req.body.message
	  ])
	  .then((result) => {
		console.log("New application is", result);
		res.sendStatus(201);
	  })
	  .catch((error) => {
		console.log(`ERROR adding application: ${error}`);
		res.sendStatus(500);
	  });
  });


module.exports = router;
