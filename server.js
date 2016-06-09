(function() {
  'use strict';

  var express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
			main 			 = require(__dirname +'/build/routes/main'),
      port       = 3000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(__dirname +'/build'));

  app.use('/', main);

  app.listen(port, function() {
    console.log('ExpressJS server is running on port '+ port +'!, ctrl-c to quit');
  });

}());
