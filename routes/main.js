(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var dotenv = require('dotenv');
  dotenv.load();
  var sendgrid_api_key = process.env.SENDGRID_APIKEY;
  var sendgrid = require('sendgrid')(sendgrid_api_key);

  // Main Client Route 
  router.route('/').get(function(req, res) {
    res.sendFile('index.html');
  });

  // Send Mail Route
  router.route('/checkout/sendOrder').post(function(req, res) {
    var data = req.body;

    var email = new sendgrid.Email();

    // Email message content and settings
    function Message() {
      var orderDetails = '<div>';
      for (var i = 0; i < data.customerOrder.length; i += 1) {
        orderDetails += '<p> item: ' + data.customerOrder[i].title + '</p>';
        orderDetails += '<p> qty: ' + data.customerOrder[i].quantity + '</p>';
        orderDetails += '<p> price: ' + data.customerOrder[i].price + '</p>';
      }
      orderDetails += '</div>';
      return orderDetails;
    }

    email.to = 'info@amwic.co.za';
    email.from = 'DDDWebAppTest@ddd.co.za';
    email.setFromName = 'DDD Web App';
    email.subject = 'Test Order from ' + data.customerName;
    email.html = '<p>Name: ' + data.customerName + '</p>' + '<p>Phone: ' + data.customerPhone + '</p>' + '<p>Email: ' + data.customerEmail + '</p>' + '<p>Delivery Address: ' + data.customerDelAddr + '</p>' + '<p>Order Details: ' + Message() + '</p>';

    // SendGrid Mailer
    sendgrid.send(email, function(err, json) {
      if (err) {
        return console.error(err);
      }
      console.log(json);
    });

    res.json(data);

  });

  module.exports = router;
}());
