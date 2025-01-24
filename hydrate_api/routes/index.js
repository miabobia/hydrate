var express = require('express');
var router = express.Router();
// const { setupGardenDB } = require('./db_manager')
const gardenDB = require('./db_manager')
// import { setupGardenDB } from 'db_manager' 

/* GET home page. */
router.get('/', function(req, res, next) {
  gardenDB.setup()
  // gardenDB.remove('USERS', 'WHERE USER_ID=0')
  // gardenDB.insert('USERS', {USER_ID: 4, USERNAME: 'alma', PASSWORD: 'ALMAPASSWORDDD'})
  res.send(gardenDB.select('USERS', 'USERNAME, PASSWORD', ''))
});

module.exports = router;