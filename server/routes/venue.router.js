const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all venues from database
// Used to display venue options
router.get('/', (req, res) => {
  const query = `SELECT * FROM venue ORDER BY "venue" ASC;`;
  pool.query(query)
    .then(result => {
		console.log('Venue result.rows', result.rows);
    	res.send(result.rows);
    })
    .catch(err => {
    	console.log('ERROR: Get all venues', err);
    	res.sendStatus(500)
    })

});

module.exports = router;