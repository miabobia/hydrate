var express = require('express');
var router = express.Router();
const gardenDB = require('./db_manager')

/*
_________________
| user api calls|
|_______________|

register new user
 1. check if user already exists


*/
//'/users/:userId/books/:bookId'

function userExists(userID) {
  let x = gardenDB.select('USERS', ['COUNT(*)'], '')[0]
  return (x['COUNT(*)'] > 0)
}

/* GET users listing. */
router.get('/:user_id', function(req, res, next) {
  console.log(gardenDB.select('USERS', '', ''))
  res.send(`user_id ${req.params.user_id} exists: ${userExists(req.params.user_id)}`)
  // let x = gardenDB.select('USERS', ['COUNT(*)'], '')
  // console.log(x)
  // res.send(x);
});

module.exports = router;