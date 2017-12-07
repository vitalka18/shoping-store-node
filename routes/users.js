var express = require('express');
var router = express.Router();
var csurfProtection = require('csurf')();
var passport = require('passport');
var validator = require('express-validator');
var { check, body, validationResult } = require('express-validator/check');
var { matchedData, sanitize } = require('express-validator/filter');

/* GET users listing. */

router.get('/sign-up',
  isNotLogged,
  csurfProtection,
  
  function(req, res, next) {
    var errors = req.flash('error');
    res.render('user/signup', {
      title: 'Sign up',
      csrf: req.csrfToken(),
      hasErrors: (errors.length > 0),
      errorsMessage: errors
    });
  }
);

router.post('/sign-up', 
  isNotLogged,
  validator(),
  csurfProtection, 
  [
    body('email', 'Email field must be an email')
      .exists()
      .isEmail(),
    body('password', 'Password field must be present')
      .exists()
      .isLength({ min: 4 }),
    body('confirm_password', 'Confirm password field must be equal password')
      .exists()
      .isLength({ min: 4 })
      .custom((value, { req }) => value === req.body.password)
  ],
  
  passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/sign-up',
    failureFlash: true
  }
));


/* GET users listing. */
router.get('/sign-in',
  isNotLogged,
  csurfProtection,
  validator(),
  
  function(req, res, next) {
    var errors = req.flash('error');
    res.render('user/signin', {
      title: 'Sign in',
      csrf: req.csrfToken(),
      hasErrors: (errors.length > 0),
      errorsMessage: errors
    });
  }
);

router.post('/sign-in',
  isNotLogged,
  csurfProtection,
  
  passport.authenticate('local.signin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/sign-in',
    failureFlash: true
  })
);

router.get('/profile', isLogged, function(req, res, next) {
  res.render('user/profile', {
    title: 'Prifile',
    user: req.user
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/')
});

function isLogged(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function isNotLogged(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

module.exports = router;
