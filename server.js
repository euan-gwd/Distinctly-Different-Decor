(function() {
  'use strict';

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('./build'));

  // app.route('/').get(function(req, res) {
  //   res.sendFile('index.html');
  // });

  // app.post('/checkout/sendOrder', function(req, res) {
  //   console.log(req.body);
  //   res.json(req.body);
  // });
  var main = require('./routes/main');
  app.use('/', main);

  app.listen(3000, function() {
    console.log('ExpressJS server is running on port 3000!, ctrl-c to quit');
  });

}());
