// garden bindings
var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res) {
    console.log("req: ", req);
    res.send(JSON.stringify("req: ", req));
});

module.exports = router;
