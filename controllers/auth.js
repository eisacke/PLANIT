var express  = require('express');
var router   = express.Router();
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;

var User     = require('../models/user');

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({ 
      success: true,
      message: "Signed up!",
      token: token
    });
  })(req, res, next);
});

router.post('/signin', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'Email not found.' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'Logged in!',
      token: token
    });
  });
});

module.exports = router