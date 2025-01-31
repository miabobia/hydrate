// garden bindings
var express = require('express');
var router = express.Router();
const gardenDB = require('./db_manager');
const createResponse = require('./response_template')



/*
SEED_ID NUMBER,
AXIOM TEXT,
RULESET TEXT,
THETA REAL,
BRANCH_LENGTH NUMBER,
DEFAULT_COLOR NUMBER
*/

router.get('/:seed_id', function(req, res, next) {
    const seed_id = req.params.seed_id

    const seedMatch = gardenDB.select(
        "CATALOG",
        [
            "SEED_ID",
            "AXIOM",
            "RULESET",
            "THETA",
            "BRANCH_LENGTH",
            "DEFAULT_COLOR"
        ],
        `WHERE SEED_ID = ${seed_id}`
        // `WHERE SEED_ID IN (0, 1, 2)`
    )
    if (seedMatch.length == 0) {
        return res.status(404).json(createResponse("error", null, "Seed not found", {
            code: "404",
            details: `The seed with ID ${seed_id} does not exist in the database.`
        }));
    }else{
        res.json(createResponse("success", seedMatch[0], `seed_id: ${seed_id} retrieved succesfully.`))
    }
});


module.exports = router;
