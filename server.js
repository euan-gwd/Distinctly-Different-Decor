(function() {
  'use strict';

  var express = require('express');
  var server = express();

  server.use(express.static('build'));
  server.listen(3000, function() {
    console.log('The express frontend server is running on port 3000!, ctrl-c to quit');
  });

}());
