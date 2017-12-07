var passport = require('passport');
var User = require('../models/user');
var passportLocal = require('passport-local');
var { matchedData, sanitize } = require('express-validator/filter');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  var errors = req.validationErrors();
  if (errors) {
    var messages = errors.map(err => req.flash('error', err.msg));
    return done(null, false, messages);
  }

  User.find({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    
    if (user.length > 0) {
      return done(null, false, { message: 'Email is already in use' });
    }
    
    var user = new User({
      name: req.body.name,
      surname: req.body.surname,
      birthday: req.body.birthday,
      tel: req.body.tel
    });
    user.email = email;
    user.password = user.encryptPassword(password);

    user.save(function(err, result) {
      if (err) {
        return done(err);
      }

      return done(null, user);
    });

  });
}));


passport.use('local.signin', new passportLocal.Strategy ({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    
    if (!user) {
      return done(null, false, { message: 'User not exist' });
    }
    
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Password is wrong' });    
    }

    return done(null, user);
  });
}));