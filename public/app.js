angular.module('app', ['ui.router', 'ngCookies'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './templates/home.html',
        controller: 'homeController as home',
        authenticate: false,
        resolve: {
                PreviousState: [
                    "$state",
                    function ($state) {
                        var currentStateData = {
                            Name: $state.current.name,
                            Params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }
                ]
            }
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

  })
  .factory('cookies', function($cookies){

  });
