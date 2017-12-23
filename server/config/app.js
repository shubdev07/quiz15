'use strict';

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const CONFIGURATION = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_LOGIN: process.env.SMTP_LOGIN,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  DB_URI: process.env.DB_URI,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
};

mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://admin:admin@ds038319.mlab.com:38319/', {config: {autoIndex: false}});
mongoose.connection.on('error', function(err) {
  console.log('MongoDB Connection Error');
  process.exit(-1);
});

/*let mailTransporter = nodemailer.createTransport({
  host: CONFIGURATION.SMTP_HOST,
  secure: true,
  auth: {
    user: CONFIGURATION.SMTP_LOGIN,
    pass: CONFIGURATION.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});*/

module.exports = {CONFIGURATION};