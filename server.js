(function() {
  'use strict';

  var express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port       = 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('./build'));

  var main = require('./routes/main');
  app.use('/', main);

  app.listen(port, function() {
    console.log('ExpressJS server is running on port '+ port +'!, ctrl-c to quit');
  });

}());
