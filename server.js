(function() {
  'use strict';

  var express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
			main 			 = require(__dirname +'/routes/main'),
      port       = 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(__dirname +'/public'));

  app.use('/', main);

  app.listen(port, function() {
    console.log('ExpressJS server is running on port '+ port +'!, ctrl-c to quit');
  });

}());
