var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: String,
  address: String,
  website: String,
  phone: String
});

var Location = mongoose.model('Location', LocationSchema);
module.exports = Location;