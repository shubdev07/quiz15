'use strict';
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.set('views',path.join(__dirname,'..','views'));
  app.use(express.static('client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
};