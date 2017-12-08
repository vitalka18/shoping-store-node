var express = require('express');
var router = express.Router();
var csurfProtection = require('csurf')();
var stripe = require('stripe')(
  "sk_test_yGKicb8Uaz52cvUmSJcGJsFA"
);
var { chunk } = require('lodash');
var Cart = require('../models/cart');
var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];

  Product.find(function(err, data) {
    if (err) {
      next(err);
    }

    res.render('shop/index', {
      title: 'Shopping cart',
      products: chunk(data, 3),
      successMsg: successMsg
    });
  });
});


router.get('/product/:id', function(req, res, next) {
  var productId = req.params.id;

  Product.findById(productId, function(err, product) {
    if (err) {
      next(err);
    }

    res.render('product', {
      title: product.title,
      product: product,
      cartProduct: req.session.cart.items[productId]
    })
  });
});


router.get('/shopping-cart', function(req, res, next) {
  var cart = new Cart(req.session.cart? req.session.cart: {});

  res.render('shop/shopping-cart', {
    title: 'Shopping cart',
    products: cart.generateArray()
  });
});


router.get('/checkout',
  csurfProtection,
  function(req, res, next) {
    var errors = req.flash('error');
    
    res.render('shop/checkout', {
      title: 'Checkout',
      csrf: req.csrfToken(),
      totalPrice: req.session.cart.totalPrice,
      noError: errors.length === 0,
      errorMessage: errors
    })
  }
);

router.post('/checkout',
  csurfProtection,
  function(req, res, next) {
    if (!req.session.cart) {
      return res.redirect('/shopping-cart');
    }

    var cart = new Cart(req.session.cart);

    stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: 'usd',
      source: req.body.stripeToken,
      description: 'Test charge'
    }, function(err, charge) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/checkout');
      }

      req.flash('success', 'Successfuly bought products');
      req.session.cart = null;
      res.redirect('/');
    });
  }
);


router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart? req.session.cart: {});
  var backURL = req.header('Referer') || '/';

  Product.findById(productId, function(err, product) {
    if (err) {
      next(err);
    }

    cart.add(product, product.id);
    req.session.cart = cart;

    res.redirect(backURL);
  });
});

router.get('/clear-cart', function(req, res, next) {
  var backURL = req.header('Referer') || '/';

  req.session.cart = new Cart({});
  res.redirect(backURL);
});

module.exports = router;
