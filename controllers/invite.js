var express = require('express');
var router = express.Router();
var path = require('path');
var Event = require('../models/event');

var EmailTemplate = require('email-templates').EmailTemplate;
var nodemailer = require('nodemailer');
var templatesDir = path.resolve(__dirname, '../public', 'email-templates')
var template = new EmailTemplate(path.join(templatesDir, 'invite'))

var transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eventplanapp@gmail.com',
    pass: 'generalassembly'
  }
});

router.post('/send', function(req, res){
  var id = req.body.id;
  Event.findById({_id: id})
  .populate('locations creator invitees')
  .exec(function(error, event){
    if (error) return res.status(404).send({message: 'The event does not exist.'});
    sendInvite(event);
    return res.status(200).send({message: 'Event found.'});
  });
});

sendInvite = function(event){

  for (var i = 0; i < event.invitees.length; i++) { 

    var invitee = event.invitees[i].email;
    var inviteeName = event.invitees[i].name;
    var locals = event;

    template.render(locals, function (err, results) {
      if (err) {
        return console.error(err)
      }

      transport.sendMail({
        from: 'Event Plan <eventplanapp@gmail.com>',
        to: invitee,
        subject: inviteeName + ", you're invited!!",
        html: results.html,
        text: results.text
      }, function (err, responseStatus) {
        if (err) {
          return console.error(err);
        }
        console.log("Email Sent");
      })
    });
  };
};

module.exports = router