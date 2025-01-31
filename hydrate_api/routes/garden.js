// garden bindings
var express = require('express');
var router = express.Router();
const gardenDB = require('./db_manager');
const createResponse = require('./response_template')
const utils = require('./utils')


function getNewGardenID() {
    return gardenDB.select('GARDENS', [], '').length;
}

// create garden
// this should *only* happen whenever a new user is registered
router.post('/:user_id', function(req, res, next) {
    const user_id = req.params.user_id;
    // res.send({len: getNewGardenID()})
    gardenDB.insert('GARDENS', {
        USER_ID: user_id,
        CREATION_DATE: utils.getCurrentDateTime(),
        GARDEN_ID: getNewGardenID()
    })

    res.send(gardenDB.select('GARDENS', [], `WHERE USER_ID = ${user_id}`))
});

// get garden (all plants from garden)
router.get('/:garden_id', function(req, res, next) {
    const garden_id = req.params.garden_id;
    const plantsMatch = gardenDB.select('PLANTS', [], `WHERE GARDEN_ID = ${garden_id}`)

    if (plantsMatch.length == 0) {
        return res.status(404).json(createResponse("error", null, "Plants not found", {
            code: "404",
            details: `No plants with GARDEN_ID ${garden_id} does not exist in the database.`
        }));
    }else{
        res.json(createResponse("success", plantsMatch, `plants: ${garden_id} retrieved succesfully.`))
    }
});

// add plant to garden
// NOTE: COLOR_ID needs to be set based on seed_id
router.post('/:garden_id/:seed_id/:position', function(req, res, next) {
    const { garden_id, seed_id, position } = req.params
    // res.send({len: getNewGardenID()})
    gardenDB.insert('PLANTS', {
        GARDEN_ID: garden_id,
        SEED_ID: seed_id,
        POS: position,
        CREATION_DATE: utils.getCurrentDateTime(),
        COLOR_ID: 0
    })

    res.send(gardenDB.select('PLANTS', [], `WHERE GARDEN_ID = ${garden_id}`))
});

module.exports = router;
