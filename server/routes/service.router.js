const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all services from database
// Used to display service options
router.get('/', rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM service ORDER BY "service" ASC;`;
  pool.query(query)
    .then(result => {
		console.log('Service result.rows', result.rows);
    	res.send(result.rows);
    })
    .catch(err => {
    	console.log('ERROR: Get all services', err);
    	res.sendStatus(500)
    })

});

module.exports = router;