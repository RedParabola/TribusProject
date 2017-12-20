var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose');
    
var APP_CONSTANTS = require('./appConstants.js');

// Connection to DB
mongoose.connect(APP_CONSTANTS.MONGODB_URL, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Router
var router = require('./router.js')(express, app, mongoose);

// Start server
app.listen(APP_CONSTANTS.SERVER_PORT, function() {
  console.log("Node server running on http://localhost:50003");
});
