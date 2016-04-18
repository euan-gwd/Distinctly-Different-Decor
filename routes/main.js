(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var dotenv = require('dotenv');
  dotenv.load();

  // var sendgrid_username = process.env.SENDGRID_USERNAME;
  // var sendgrid_password = process.env.SENDGRID_PASSWORD;
  var sendgrid_api_key = process.env.SENDGRID_APIKEY;

  // var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
  var sendgrid = require('sendgrid')(sendgrid_api_key);


  // var nodemailer = require('nodemailer');
  // var sgTransport = require('nodemailer-sendgrid-transport');
  // var options = {
  //   auth: {
  //     api_user: sendgrid_username,
  //     api_key: sendgrid_password
  //   }
  // };
  // var mailer = nodemailer.createTransport(sgTransport(options));

  // Main Client Route 
  router.route('/').get(function(req, res) {
    res.sendFile('index.html');
  });

  // Send Mail Api Route
  router.route('/checkout/sendOrder').post(function(req, res) {
    var data = req.body;
    console.log(data.customerOrder[0].title);
    var email = new sendgrid.Email();

    email.addTo = 'info@amwic.co.za';
    email.setFrom = 'DDDWebAppTest@ddd.co.za';
    email.subject = 'Test Order from ' + data.customerName;
    email.html = '<h1> New Order from Website</h1><p>Name:'+ data.customerName + '</p><p>Phone:'+ data.customerPhone + '</p><p>Email:'+ data.customerEmail +'</p><p>Delivery Address:' + data.customerDelAddr +'</p><p>Order Details:'+ data.customerOrder +'</p>';

    // console.log(email);
    // res.json(data);

    // SendGrid Mailer
    // sendgrid.send(email, function(err, json) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log(json);
    // });

    // mailer.sendMail(email, function(err, res) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(res);
    // });
  });

  module.exports = router;
}());
