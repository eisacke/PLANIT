var express = require('express');
var router = express.Router();

var User = require('../models/user');

// INDEX
router.get('/', function(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).json({message: 'There are no users in the database.'});
    return res.status(200).send(users);
  });
});

// SHOW
router.get('/:id', function(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: 'The user does not exist.'});
    return res.status(200).send(user);
  });
});

// CREATE
router.post('/', function(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "User failed to create."});
    return res.status(200).send(user);
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'No user with that ID. Could not delete.'});
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router