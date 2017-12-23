'use strict';

const {ENV, PORT} = require('./config/app').CONFIGURATION;
var express = require('express');

var app = express();
require('./config/express')(app);
require('./config/route')(app);
require('./config/error')(app);



app.listen(PORT, function() {
  console.log(`Express server is listening on port ${PORT} in ${ENV} environment`);
});