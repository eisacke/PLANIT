var express = require('express');
var router = express.Router();

var Invitee = require('../models/invitee');

// CREATE
router.post('/', function(req, res){
  var invitee = new Invitee(req.body.invitee);
  invitee.save(function(error){
    Event.findByIdAndUpdate({_id: req.body.event_id}, {$push: {"invitees": invitee._id}}, function(error){
      if (error) return res.status(403).send({message: "Failed to invite"});
      return res.status(200).send(invitee);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Invitee.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'No invitee with that ID. Could not delete.'});
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router