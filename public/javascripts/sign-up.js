SignUp = (() => {
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm_password");

  if (password && confirmPassword) {
    password.onchange = validatePassword.bind(null, password, confirmPassword);
    confirmPassword.onkeyup = validatePassword.bind(null, password, confirmPassword);
  }


  $('.js-reset-error').on('click', function() {
    $(this)
      .closest('form')
      .find('.js-error')
      .remove();
  });


  /**
   * 
   * @param {NodeElement} password 
   * @param {NodeElement} confirmPassword 
   */
  function validatePassword(password, confirmPassword){
    if(password.value != confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity('');
    }
  }


  return {
    validatePassword: validatePassword
  }
})();