// garden bindings
var express = require('express');
var router = express.Router();
const gardenDB = require('./db_manager');
const createResponse = require('./response_template')

/* GET users listing. */
// router.get('/', function(req, res) {
//     console.log("req: ", req);
//     res.send(JSON.stringify("req: ", req));
// });

router.get('/:color_id', function(req, res, next) {
    const color_id = req.params.color_id

    const color_match = gardenDB.select("COLORS", ["RED", "GREEN", "BLUE", "ALPHA"], `WHERE COLOR_ID = ${color_id}`)
    if (color_match.length == 0) {
        return res.status(404).json(createResponse("error", null, "Color not found", {
            code: "404",
            details: `The color with ID ${color_id} does not exist in the database.`
        }));
    }else{
        res.json(createResponse("success", color_match[0], `color_id: ${color_id} retrieved succesfully.`))
    }
});


module.exports = router;
