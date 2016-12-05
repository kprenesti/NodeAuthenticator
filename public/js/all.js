angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  });
  // .factory('userInfo', function(){
  //   var user;
  //   user.setUserData = function(userObj){
  //     if(userObj){
  //       user = userObj;
  //     } else {
  //       return
  //     }
  //
  //   }
  //   return user;
  //
  // });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  });
  // .factory('userInfo', function(){
  //   var user;
  //   user.setUserData = function(userObj){
  //     if(userObj){
  //       user = userObj;
  //     } else {
  //       return
  //     }
  //
  //   }
  //   return user;
  //
  // });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  });
  // .factory('userInfo', function(){
  //   var user;
  //   user.setUserData = function(userObj){
  //     if(userObj){
  //       user = userObj;
  //     } else {
  //       return
  //     }
  //
  //   }
  //   return user;
  //
  // });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  });
  // .factory('userInfo', function(){
  //   var user;
  //   user.setUserData = function(userObj){
  //     if(userObj){
  //       user = userObj;
  //     } else {
  //       return
  //     }
  //
  //   }
  //   return user;
  //
  // });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  })
  .factory('userInfo', function(){
    var user;
    user.setUserData = function(userObj){
      if(userObj){
        user = userObj;
      } else {
        return
      }

    }
    return user;

  });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  })
  .factory('userInfo', function(){
    var user;
    user.setUserData = function(userObj){
      if(userObj){
        user = userObj;
      } else {
        return
      }

    }
    return user;

  });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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

angular.module('app', ['ui-router'])
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
        component: 'login',
        authenticate: false
      })
      .state('home.signUp', {
        component: 'signUp',
        authenticate: false
      })
      .state('welcomeUser', {
        url: '/welcome',
        templateUrl: './templates/welcome.html',
        controller: 'welcomeController as welcome',
        authenticate: true
      })
      .state('changePW', {
        url: '/changePW',
        templateUrl: './templates/changePW.html',
        controller: 'changePWController as changePW',
        authenticate: true
      })
      .state('oops', {
        url: '/oops',
        template: './templates/oops.html',
        controller: 'oopsController as oops',
        authenticate: false
      });
  })
  .factory('userInfo', function(){
    var user;
    user.setUserData = function(userObj){
      if(userObj){
        user = userObj;
      } else {
        return
      }

    }
    return user;

  });

angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })

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
