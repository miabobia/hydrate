const express = require('express')
const gardenDB = require('./routes/db_manager')
const app = express()
const port = 3000

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gardenRouter = require('./routes/garden');
var colorRouter = require('./routes/color');
var catalogRouter = require('./routes/catalog');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/garden', gardenRouter);
app.use('/color', colorRouter);
app.use('/catalog', catalogRouter);

gardenDB.setupDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
