var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Event = require('../models/event');

// INDEX
router.get('/', function(req, res){
  Location.find(function(error, locations){
    if(error) return res.status(404).send({message: 'Could not find locations'})
    return res.status(200).send(locations);
  });
});

// SHOW
router.get('/:id', function(req, res){
  var id = req.params.id;
  Location.findById({_id: id}, function(error, location){
    if(error) return res.status(404).send({message: 'Could not find location'})
    return res.status(200).send(location);
  });
});

// CREATE
router.post('/', function(req, res){
  var location = new Location(req.body.location);
  location.save(function(error, location){
    Event.findByIdAndUpdate({_id: req.body.event_id}, {$push: {"locations": location._id}}, function(error){
      if(error) return res.status(403).send({message: 'Could not add location b/c' + error});
      return res.status(200).send(location);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Location.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No location with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router