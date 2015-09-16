var express = require('express');
var router = express.Router();

// var Event = require('../models/event');

// INDEX
router.post('/send', function(req, res){
  console.log("ARRIVED!")
  console.log(req.body);
  // Invitee.find(function(error, invitees){
  //   if (error) return res.status(404).json({message: 'There are no invitees in the database.'});
  //   return res.status(200).send(invitees);
  // });
});

module.exports = router