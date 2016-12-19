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
  app.controller('signUpController', function($http, userInfo, $state){
    var signup = this;
    signup.error = "";

    signup.noFieldsBlank = function(username, firstName, lastName, password1, password2){
      if(!username || !firstName || !lastName || !password1 || !password2){
        signup.error = "Please fill in all fields."
        return false;
      } else {
        return true;
      }
    };

    signup.checkPassword = function(pw1, pw2){
      if(pw1 && pw2){
        if(pw1 === pw2){
          signup.password = pw1;
          return true;
        } else if(pw1 != pw2) {
          signup.error = "Passwords don't match!"
          return false;
        }
      } else if(!pw1 || !pw2) {
        signup.error = "Please enter a valid password."
        return false;
      }
    };

    signup.checkFields = function(){
      var fields = signup.noFieldsBlank(signup.username, signup.firstName, signup.lastName, signup.password1, signup.password2);
      var pw;
      if(fields){
         pw = signup.checkPassword(signup.password1, signup.password2);
      }
      if(!fields || !pw){
        $state.transitionTo($state.current, {}, {reload: false});
      }
      signup.user = {
        username: signup.username,
        firstName: signup.firstName,
        lastName: signup.lastName,
        password: signup.password,
        email: signup.email
      };
      if(fields && pw){
        $http.post('/users', JSON.stringify(signup.user)).then(function(user){
          userInfo.setUserData(user.data);
          $state.go('welcomeUser');
        }).catch(function(e){
          console.log(e);
        });
        console.log(fields, pw);
      }

      // $state.transitionTo($state.current, {} ,{reload: true});

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
