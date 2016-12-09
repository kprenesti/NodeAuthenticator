var app = angular.module('app');
  app.controller('signUpController', function($http, userInfo){
    var signup = this;

    signup.noFieldsBlank = function(username, firstName, lastName, password1, password2){
      if(!username || !firstName || !lastName || !password1 || !password2){
        return signup.error = "Please fill in all fields."
      }
    };

    signup. checkPassword = function(pw1, pw2){
      if(pw1 === pw2){
      signup.password = pw1;
      } else {
          signup.error = "Error: Passwords Don't Match!";
        }
    };

    signup.function checkEmail(email) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(email)) {
        return signUp.error = "Error: Please enter a valid e-mail address.";
      }
      return true;
  };

    signup.user = {
      username: signup.username,
      firstName: signup.firstName,
      lastName: signup.lastName,
      password: signup.password,
      email: signup.email
    };

    signup.submitUser = function(){
      // signup.checkPassword(signUp.password1, signUp.password2);
      // signup.checkEmail(signup.email);
      console.log('The function is properly connected');
      // $http.post('/users', signup.user).then(function(user){
      //   userInfo.setUserData(user);
      //   console.log(user);
      // })
    }
  });



app.controller('homeController', function(){
  var home = this;
  home.message = "This is a simple demonstration of the authorization process in Node.  This authorization was done by using password encryption and utilizing JSON web tokens.  You will be able to sign up, log in, see your information, and log out."
});
