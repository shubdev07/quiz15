'use strict';

const { ENV, PORT } = require('./config/app').CONFIGURATION;
const express = require('express');

const app = express();
require('./config/express')(app);
require('./config/route')(app);
require('./config/error')(app);


app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT} in ${ENV} environment`);
});