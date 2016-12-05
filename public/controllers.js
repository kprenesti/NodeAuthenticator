var app = angular.module('app');
  app.controller('signUpController', function($http, userInfo){
    var signup = this;

    signup.noFieldsBlank = function(username, firstName, lastName, password1, password2){
      if(!username || !firstName || !lastName || !password1 || !password2){
        return signup.error = "Please fill in all fields."
      }
    }

    signup. checkPassword = function(pw1, pw2){
      if(pw1 === pw2){
      signUp.password = pw1;
      } else {
        signUp.error = "Error: Passwords Don't Match!";
      }
    }
    function checkEmail(email) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(email)) return signUp.error = "Error: Please enter a valid e-mail address.";
      return true;
  }
    signUp.user = {
      username: signUp.username,
      firstName: signUp.firstName,
      lastName: signUp.lastName,
      password: signUp.password,
      email: signUp.email
    };
    signUp.submitForm = function(){
      checkPassword(signUp.password1, signUp.password2);
      checkEmail(signUp.email);
      $http.post('/users', signUp.user).then(function(user){
        userInfo.setUserData(user);
        console.log(user);
      })
    }
  });



app.controller('homeController', function(){
  var home = this;
  home.message = "This is a simple demonstration of the authorization process in Node.  This authorization was done by using password encryption and utilizing JSON web tokens.  You will be able to sign up, log in, see your information, and log out."
});
