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

    // Customer Order items
    function Message() {
      var orderDetails = '<div>';
      for (var i = 0; i < data.customerOrder.length; i += 1) {
        // orderDetails += '<p style="color:blue;"> Item Name: </p>' + data.customerOrder[i].title;
        // orderDetails += '<p style="color:blue;"> quantity ordered: ' + data.customerOrder[i].quantity + '</p>';
        // orderDetails += '<p style="color:blue;"> Item Price: </p>' + 'R ' + data.customerOrder[i].price;
				orderDetails += '<p style="color:blue;">'+ data.customerOrder[i].quantity + ' x ' + data.customerOrder[i].title + ' @ R ' + data.customerOrder[i].price + ' Each';
			}
      orderDetails += '</div>';
      return orderDetails;
    }

		// Email message payload
		var payload = '<p>A New Order from Website has arrived<p>' + '<h3>Name: ' + data.customerName + '</h3>' + '<h3>Phone: ' + data.customerPhone + '</h3>' + '<h3>Email: ' + data.customerEmail + '</h3>' + '<h4>Delivery Address: ' + data.customerDelAddr + '</h4>' + '<p>Order Details: ' + Message() + '</p>'+'<small>End of Order</small>';

		var email = new sendgrid.Email();

    email.to = 'info@amwic.co.za';
    email.from = 'DDDWebAppTest@ddd.co.za';
    email.setFromName = 'DDD Web App';
    email.subject = 'Test Order from ' + data.customerName;
    email.html = payload;

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
