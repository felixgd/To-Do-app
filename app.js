var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var uuid = require('node-uuid');

var user = require('./routes/userroutes');
var list = require('./routes/listroutes');
var dashboard = require("./routes/dashboardroutes");

var bodyParser = require('body-parser');

var cookieSession = require('cookie-session');

var keys = require('./config/keys');
//app.use(express.static(__dirname + 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: [keys.session.cookieKey],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/scripts'));
app.use(express.static(__dirname + '/public/assets'));

app.use('/', user);
app.use('/dashboard', dashboard);
app.use('/user', user);
app.use('/verification', user);
app.use('/list', list);

app.use(function(req, res, next){
  var err = new Error ('Not Found');
  err.status = 404;
  next(err); 
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  console.log(err); 
});

app.listen(1337, function(){
  console.log('Listening at port 1337');
})

