angular.module('app', ['ui.router', 'ngStorage'])
  .run(function($rootScope, $state, $injector){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      console.log({"toState": toState, "toParams": toParams, "fromState": fromState, "fromParams": fromParams});
      var currentUser = $injector.get('$localStorage').currentUser
      if(currentUser && toState.name != 'welcomeUser'){
        event.preventDefault();
        $state.go('welcomeUser');
      } else if(!currentUser && toState.name == 'welcomeUser'){
        $state.go('home.login');
      }
      return;
    }); //end rootScope.on
  })//end .run
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $localStorageProvider){
    $httpProvider.interceptors.push('headersService'); //end httpProvider
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        templateUrl: './templates/home.html',
        controller: 'homeController as home',
        authenticate: false
      })
      .state('home.login', {
        url: '',
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
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true,
        resolve: {
          auth: function($q, authService) {
            var userInfo = authService.checkForToken();

            if (userInfo) {
              return $q.resolve();
            } else {
              return $q.reject({ authenticated: false });
            }
          }
        }
      });
      // .state('changePW', {
      //   url: '/changePW',
      //   templateUrl: './templates/changePW.html',
      //   controller: 'changePWController as changePW',
      //   authenticate: true
      // });
  });
