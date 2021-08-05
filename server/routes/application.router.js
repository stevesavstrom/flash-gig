const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET applications by job id
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

module.exports = router;
