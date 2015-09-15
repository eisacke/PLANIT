var mongoose = require('mongoose');
var User = require('./user');
var Location = require('./location');

var EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  locations: [{ type: mongoose.Schema.ObjectId, ref: 'Location'}],
  invitees: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;