var StripeModule = (() => {
  var stripe = Stripe('pk_test_r5WAfpBI6oRRgElz5MILDdvM');
  var elements = stripe.elements();

  var $form = $('#checkout');
  var $submitBtn = $form.find('button[type="submit"]');

  var card = elements.create('card');
  card.mount('#card-element');

  card.addEventListener('change', function(event) {
    var displayError = $('#card-errors');
    if (event.error) {
      displayError.show().find('.card-body').text(event.error.message);
    } else {
      displayError.hide().find('.card-body').text('');     
    }
  });

  $form.submit(function(event) {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        var errorElement = $('#card-errors');
        errorElement.hide().find('.card-body').text(result.error.message);           
      } else {
        stripeTokenHandler(result.token);
      }
    });
    return false;
  });

  function stripeTokenHandler(token) {
    var $form = $('#checkout');    
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    debugger
    $form.append(hiddenInput);
  
    $form[0].submit();
  }
})();
