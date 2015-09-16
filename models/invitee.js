var mongoose = require('mongoose');

var InviteeSchema = mongoose.Schema({
  name: String,
  email: String
});

var Invitee = mongoose.model("Invitee", InviteeSchema);
module.exports = Invitee;