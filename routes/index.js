var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var { chunk } = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('asdas');
  Product.find(function(err, data) {
    if (err) {
      next(err);
    }

    res.render('shop/index', {
      title: 'Shopping cart',
      products: chunk(data, 3)
    });
  });
});

module.exports = router;
