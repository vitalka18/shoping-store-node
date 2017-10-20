var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var lodash = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, data) {
    if (err) {
      next(err);
    }

    res.render('index', {
      title: 'Shopping cart',
      products: lodash.chunk(data, 3)
    });
  });
});

module.exports = router;
