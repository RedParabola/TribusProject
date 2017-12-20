var mongoose = require('mongoose');
var Thing = mongoose.model('Thing');

//POST - Insert a new thing in the DB
exports.addThing = function(req, res) {
  console.log(req.body);
  var thing = new Thing({
    id:       req.body.id,
    name:     req.body.name,
    category: req.body.category,
    type:     req.body.type,
  });
  thing.save(function(err, thing) {
    if(err){
      console.log('FAILED POST addThing ' + thing.id);
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS POST addThing ' + thing.id);
      res.status(200).jsonp(thing);
    }
  });
};

//GET - Return all things in the DB
exports.getAllThings = function(req, res) {
  Thing.find(function(err, things) {
    if(err){
      console.log('FAILED GET getAllThings');
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS GET getAllThings');
      res.status(200).jsonp(things);
    }
  });
};

//GET - Return a thing with specified ID
exports.getThingById = function(req, res) {
  Thing.findOne({id : req.params.id}, function(err, thing) {
    if(err){
      console.log('FAILED GET getThingById ' + req.params.id);
      res.status(500).send(err.message);
    }else{
      console.log('SUCCESS GET getThingById ' + req.params.id);
      res.status(200).jsonp(thing);
    }
  });
};

//PUT - Update a thing that already exists
exports.updateThing = function(req, res) {
  Thing.findOne({id : req.params.id}, function(err, thing) {
    thing.id =       req.body.id;
    thing.name =     req.body.name;
    thing.category = req.body.category;
    thing.type =     req.body.type;

    thing.save(function(err) {
      if(err){
        console.log('FAILED PUT updateThing ' + req.params.id);
        res.status(500).send(err.message);
      }else{
        console.log('SUCCESS PUT updateThing ' + req.params.id);
        res.status(200).jsonp(thing);
      }
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(thing);
    });
  });
};

//DELETE - Delete a thing with specified ID
exports.deleteThing = function(req, res) {
  Thing.findOne({id : req.params.id}, function(err, thing) {
    thing.remove(function(err) {
      if(err){
        console.log('FAILED DELETE deleteThing ' + req.params.id);
        res.status(500).send(err.message);
      }else{
        console.log('SUCCESS DELETE deleteThing ' + req.params.id);
        res.status(200).jsonp(thing);
      }
    })
  });
};