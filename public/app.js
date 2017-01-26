angular.module('app', ['ui.router', 'ngMaterial', 'ngStorage'])
  // .run(function($rootScope, $state, $localStorageProvider){
  //   $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //
  //   }
  // })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $localStorageProvider){
    $httpProvider.interceptors.push('headersService'); //end httpProvider
    $locationProvider.html5Mode(true);
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
      });
      // .state('changePW', {
      //   url: '/changePW',
      //   templateUrl: './templates/changePW.html',
      //   controller: 'changePWController as changePW',
      //   authenticate: true
      // });
  });
