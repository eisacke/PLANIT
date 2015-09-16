var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var secret      = require('./config/config').secret;

var passport = require('passport');
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/event-plan'
mongoose.connect(databaseURL);

app.set('views', './public');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app
  .use('/api', expressJWT({secret: secret})
  .unless({path: ['/api/auth/signin', '/api/auth/signup'], method: 'post'}));

app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

app.use(logger('dev'));
app.use(require('./controllers'));
app.listen(process.env.PORT || 3000);