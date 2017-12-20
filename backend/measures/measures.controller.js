var mongoose = require('mongoose');
var Measures = mongoose.model('Measure');
var Python = require('../config/pythonScripts.js');

//GET - Return the live measures
exports.getLiveMeasures = function(req, res) {
  Python.getLiveMeasures(function (err, results) {
    if(err){
      console.log('FAILED GET getLiveMeasures');
      console.log('Error is: ' + err.message);
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS GET getLiveMeasures');
      // results is an array consisting of messages collected during execution
      res.status(200).jsonp(results);
      console.log(results);
    }
  });
};

//POST - Set humidifier
exports.turnHumidifier = function(req, res) {
  setHumidifier(req, res, req.body.power);  
};

//POST - Set humidity Control
exports.setHumidityControl = function(req, res) {
  Measures.findOne({room : req.body.roomId}, function(err, measure) {
    if(err){
      console.log('FAILED GET last measure for ' + req.body.roomId);
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS GET room humidity ' + measure.humidity);
      var turnOn = (measure.humidity < req.body.thresholdmin ) ? true : false;
      setHumidifier(req, res, turnOn);
    }
  });
};

function setHumidifier(req, res, power){
  Python.setHumidifier(power,function (err, results) {
    if(err){
      console.log('FAILED POST setHumidifier ' + power);
      console.log('Error is: ' + err.message);
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS POST setHumidifier ' + power);
      console.log(results);
      res.status(200).jsonp(results);
    }
  });
}