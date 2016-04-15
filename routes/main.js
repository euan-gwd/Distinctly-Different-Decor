(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var nodemailer = require('nodemailer');

  router.route('/').get(function(req, res) {
    res.sendFile('index.html');
  });

  router.route('/send').get(function(req, res) {

  });

  module.exports = router;
}());
