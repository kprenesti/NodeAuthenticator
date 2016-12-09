angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './templates/home.html',
        controller: 'homeController as home',
        authenticate: false
      })
      .state('home.login', {
        templateUrl: './templates/login.html',
        controller: 'loginController as login',
        authenticate: false
      })
      .state('home.signUp', {
        templateUrl: './templates/signUp.html',
        controller: 'signUpController as signup',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      // .state('changePW', {
      //   url: '/changePW',
      //   templateUrl: './templates/changePW.html',
      //   controller: 'changePWController as changePW',
      //   authenticate: true
      // })
      ;
  })
  .factory('userInfo', function(){
    var user ={};
    user.userInstance;
    user.setUserData = function(userObj){
      if(userObj){
        user.userInstance = userObj;
      } else {
        return;
      }
    }
    user.getUserData = function(){
      if(typeof user.userInstance == 'object'){
        return user.userInstance;
      } else{
        return 'Error: The user instance is not valid.'
      }
    }
    return user;

  });


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

  //   signup.function checkEmail(email) {
  //     var reg = /^([A-z0-9_\-\.])+\@([A-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  //     if (!reg.test(email)) {
  //       return signUp.error = "Error: Please enter a valid e-mail address.";
  //     }
  //     return true;
  // };

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
