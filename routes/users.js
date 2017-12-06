var express = require('express');
var router = express.Router();
var csurfProtection = require('csurf')();

router.use(csurfProtection);

/* GET users listing. */
router.get('/sign-up', function(req, res, next) {
  res.render('user/signup', {
    title: 'Sign up',
    csrf: req.csrfToken()
  });
});

router.post('/sign-up', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
