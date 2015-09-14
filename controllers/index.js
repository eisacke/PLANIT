var express = require('express');
var router = express.Router();

router.use('/api/users', require('./user'));
router.use('/api/events', require('./event'));
router.use('/api/location', require('./location'));

router.get('/', function(req, res) {
  res.render("index.html");
});

module.exports = router;