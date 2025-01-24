const express = require('express')
const gardenDB = require('./routes/db_manager')
const app = express()
const port = 3000

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gardenRouter = require('./routes/garden');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/garden', gardenRouter);

gardenDB.setup()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
