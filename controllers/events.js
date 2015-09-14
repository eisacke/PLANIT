var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var Location = require('../models/location');


// INDEX 
router.get('/', function(req, res){
  Event.find()
  .populate('locations')
  .exec(function(error, events){
    if(error)return res.status(404).json({message: 'Could not find any events'});
    return res.status(200).send(events);
  });
});

// SHOW
router.get('/:id', function(req,res){
  var id = req.params.id;
  Event.findById({_id: id})
  .populate('locations')
  .exec(function(error, event){
    if(error) return res.status(404).send({message: 'Could not find event'});
    return res.status(200).send(event);
  });
});

// POST
router.post('/', function(req, res){
  var event = new Event(req.body);
  event.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create event b/c' + error});
    return res.status(200).send(event);
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Event.findById(id, function(error, event){
    for (var i = 0; i < event.locations.length; i++) {
      Location.remove({_id: event.locations[i]}, function(){});
    }
    Event.remove({_id: id}, function(error){
      if (error) res.status(404).send({message: 'No event with that ID. Could not delete.'});
      return res.status(204).send({message: 'Deleted!'})
    });
  });
});

module.exports = router