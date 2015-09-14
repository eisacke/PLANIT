var express = require('express');
var router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
// router.use('/api/location', require('./locations'));

router.get('/', function(req, res) {
  res.render("index.html");
});

module.exports = router;