angular.module('app', ['ui-router'])
  .config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('signUp')
        url: '/signup'
        templateUrl: 'signup.html',
        controller: 'signUpController as signUpCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginController as loginCtrl'
      })
      .state('memberInfo', {
        url: '/memberInfo',
        templateUrl: 'memberInfo.html',
        controller: 'memberInfoController as memberInfoCtrl'
      });
