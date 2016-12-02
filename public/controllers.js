angular.module('app')
  .controller('signUpController', function($http, userInfo){
    var signup = this;
    signUp.error = false;
    signUp.user = {
      username: signUp.username,
      firstName: signUp.firstName,
      lastName: signUp.lastName,
      password: signUp.password,
      email: signUp.email
    };
    if(signUp.password1 === signUp.password2){
      signUp.password = signUp.password1;
    } else {
      signUp.error = "Error: Passwords Don't Match!";
    }
    signUp.submitForm = function(){
      $http.post('/users', signUp.user).then(function(user){

      })
    }
  })
