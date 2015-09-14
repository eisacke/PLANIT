var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var passport = require('passport');
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/event-plan'
mongoose.connect(databaseURL);

app.set('views', './public');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(require('./controllers'));
app.listen(process.env.PORT || 3000);