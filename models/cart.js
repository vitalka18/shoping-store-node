function Cart(oldCart) {
  
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  console.log(this);
}

Cart.prototype.add = function(item, id) {
  var storedItem = this.items[id];
  if (!storedItem) {
    storedItem = this.items[id] = {
      item: item,
      qty: 0,
      price: 0
    };
  }
  storedItem.qty++;
  storedItem.price = storedItem.item.price * storedItem.qty;

  this.totalQty++;
  this.totalPrice += storedItem.item.price;
};

Cart.prototype.generateArray = function() {
  var products = [];
  
  for (var id in this.items) {
    products.push(this.items[id]);
  }

  return products;
};

Cart.prototype.remove = function(id) {

};

module.exports = Cart;