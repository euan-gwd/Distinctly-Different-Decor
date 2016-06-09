(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var dotenv = require('dotenv');
  dotenv.load();
  var sendgrid_api_key = process.env.SENDGRID_APIKEY;
  var sendgrid = require('sendgrid')(sendgrid_api_key);
	var jade = require('jade');
	var templatePath = __dirname + '/weborder.jade';

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
      for (var i = 0; i < req.body.customerOrder.length; i += 1) {
        orderDetails += '<p> item: ' + req.body.customerOrder[i].title + '</p>';
        orderDetails += '<p> qty: ' + req.body.customerOrder[i].quantity + '</p>';
        orderDetails += '<p> price: ' + req.body.customerOrder[i].price + '</p>';
      }
      orderDetails += '</div>';
      return orderDetails;
    }
		var customerOrderItems = Message();

    email.to = 'info@amwic.co.za';
    email.from = 'DDDWebAppTest@ddd.co.za';
    email.setFromName = 'DDD Web App';
    email.subject = 'Test Order from ' + req.body.customerName;
    // email.html = '<p>Name: ' + data.customerName + '</p>' + '<p>Phone: ' + data.customerPhone + '</p>' + '<p>Email: ' + data.customerEmail + '</p>' + '<p>Delivery Address: ' + data.customerDelAddr + '</p>' + '<p>Order Details: ' + Message() + '</p>';
		email.html = jade.renderFile(templatePath, req.body, customerOrderItems);

    // SendGrid Mailer
    sendgrid.send(email, function(err, json) {
      if (err) {
        return console.error(err);
      }
      console.log(json);
    });
    res.json(req.body);
  });
  module.exports = router;
}());
