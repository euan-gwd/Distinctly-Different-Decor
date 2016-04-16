(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  var dotenv = require('dotenv');
  dotenv.load();
  var sendgrid_username = process.env.SENDGRID_USERNAME;
  var sendgrid_password = process.env.SENDGRID_PASSWORD;

  var nodemailer = require('nodemailer');
  var sgTransport = require('nodemailer-sendgrid-transport');
  var options = {
    auth: {
      api_user: sendgrid_username,
      api_key: sendgrid_password
    }
  };
  var mailer = nodemailer.createTransport(sgTransport(options));

  router.route('/').get(function(req, res) {
    res.sendFile('index.html');
  });

  router.route('/checkout/sendOrder').post(function(req, res) {
    
    res.json(req.body);
    var data = req.body;

    console.log(data);

    var email = {
      to: 'info@amwic.co.za',
      from: 'DDDWebAppTest@ddd.co.za',
      subject: 'Test Send from new Web App',
      html: '<h1>Hello, This is my first email through SendGrid</h1>'
    };

    // mailer.sendMail(email, function(err, res) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(res);
    // });
  });

  module.exports = router;
}());
