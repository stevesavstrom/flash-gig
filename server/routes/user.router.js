const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
  console.log(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const state = req.body.state;
  const email = req.body.email;
  const service = req.body.service;
  const bio = req.body.bio;

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, city, state, email, service, bio)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
  pool
    .query(queryText, [username, password, firstName, lastName, city, state, email, service, bio])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// PUT to edit user profile information
router.put("/", rejectUnauthenticated, (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const state = req.body.state;
  const email = req.body.email;
  const service = req.body.service;
  const bio = req.body.bio;

  const query = 
  `UPDATE "user" 
  SET "first_name"=$1,
  "last_name"=$2,
  "city"=$3,
  "state"=$4,
  "email"=$5,
  "service"=$6,
  "bio"=$7
  WHERE id=$8;`;

	pool
	  .query(query, [
      firstName,
      lastName,
      city,
      state,
      email,
      service,
      bio,
      req.user.id
    ])
	  .then((result) => {
		console.log("Updated user profile info with PUT", result);
		res.sendStatus(201);
	  })
	  .catch((error) => {
		console.log(`ERROR updating user profile with PUT: ${error}`);
		res.sendStatus(500);
	  });
  });

module.exports = router;
