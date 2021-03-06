var mongoose = require('mongoose');
var User = require('./user');
var Location = require('./location');

var EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  locations: [{ type: mongoose.Schema.ObjectId, ref: 'Location'}],
  invitees: [{ type: mongoose.Schema.ObjectId, ref: 'Invitee'}]
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;