var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var ExpressSessions = require('express-sessions');
var passport = require('passport');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shop-store', {
  useMongoClient: true
});
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret_Store_express',
  saveUninitialized: true,
  name: 'timonAndPumba',
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 8640000
  },
  store: new ExpressSessions({
    storage: 'mongodb',
    instance: mongoose, 
    host: 'localhost',
    port: 27017,
    db: 'shop-store',
    collection: 'sessions',
    expire: 8640000
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
