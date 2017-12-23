'use strict';

const {ENV} = require('./app');

module.exports = function(app) {

  if(ENV !== 'production') {
    app.use(function(req, res) {
      res.status(404).send('The requested resource is not found');
    });
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).send(err);
    });
  }
  app.use(function(req, res) {
    res.status(404).send();
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send();
  });

};