var express = require("express");
var app = express();

// Setup static resources
app.use('/', express.static('./src'));

// Start listening
var port = 8888;
app.listen(port);
console.log('Server started on ' + port + '. Ctrl+C to exit.');

