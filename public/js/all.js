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
        // resolve: {
        //   auth: function($q, authService) {
        //     var userInfo = authService.checkForToken();
        //
        //     if (userInfo) {
        //       return $q.resolve();
        //     } else {
        //       return $q.reject({ authenticated: false });
        //     }
        //   }
        // }
      })
      .state('about', {
        url: '/about',
        templateUrl: './templates/about.html',
        controller: 'aboutController as aboutCtrl',
        authenticate: false
      });
      // .state('changePW', {
      //   url: '/changePW',
      //   templateUrl: './templates/changePW.html',
      //   controller: 'changePWController as changePW',
      //   authenticate: true
      // });
  });

angular.module('app').factory('authService', function ($http, $localStorage, userInfo){
   var authService = this;
   //creds passed from login.subit's call to this function.
   authService.checkForToken = function(){
     if($localStorage.currentUser){
       if($localStorage.currentUser.token){
         return true;
       } else {
         return false;
       }
     }
   };
   authService.login = function(creds, cb){
     $http.post('/users/login', JSON.stringify(creds))
      .then(function(res) {
        var auth = res.headers('Auth');
        // console.log("res.headers('Auth'):", auth, {"res.data": res.data});
        if (auth) {
          // userInfo.setUserData(res.data);
          //stores information in localStorage on the currentUser.  Populate Welcome from localStorage.
          $localStorage.currentUser = res.data;
          $localStorage.currentUser.token = auth;
          console.log({"localStorage.currentUser": $localStorage.currentUser});
          cb(true);
        } else {
          cb(false);
        }
      }).catch(function(e){
        console.log(e);
      })
   };
   authService.Logout = function() {
          // remove user from local storage and clear http auth header
          delete $localStorage.currentUser;
          $http.defaults.headers.common.Auth = '';
        };
   return authService;
});
//

angular.module('app').factory('headersService', function($location, $localStorage, $injector){
  var headersSvc = {};
    headersSvc.request = function(config){
      config.headers = config.headers || {};
      if($localStorage.currentUser){
        if($localStorage.currentUser.token){
          var http = $injector.get('$http');
          http.defaults.headers.common.Auth = $localStorage.currentUser.token;
       } else {
         $injector.get('$state').go('home.login');
       }
      }
      return config;
    };
    headersSvc.responseError = function(response){
      if(response.status === 401 || response.status === 403){
        return $location.state('home.login');
      }
    }; //end responseError
  return headersSvc;
}); //end

angular.module('app').factory('userInfo', userInfo);

function userInfo(){
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

}

angular.module('app').controller('homeController', function(){
  var home = this;
  home.message = "This is a simple demonstration of the authorization process in Node.  This authorization was done by using password encryption and utilizing JSON web tokens.  You will be able to sign up, log in, see your information, and log out."
});

angular.module('app').controller('loginController', function($http, userInfo, $state, authService){
  var login = this;
  var type;
  if(userInfo.userInstance){
    login.firstName = userInfo.userInstance.firstName;
  }
  function checkFields(){
    if(!login.creds || !login.password){
      login.error = "Please fill in all fields."
    }
    if(login.creds && /@/gi.test(login.creds)){
      login.email = login.creds;
      type = 'Email';
      console.log('email', login.email)
    } else {
      login.username = login.creds;
      console.log('username', login.username);
      type = 'Username';
    }
  }
  login.submit = function(){
    checkFields();
    var creds = {};
      if(login.email){
        creds.email = login.email;
      } else if(login.username){
        creds.username = login.username;
      }
     creds.password = login.password;
     authService.login(creds, function(result){
      console.log(result);
      if(result === true){
        $state.go('welcomeUser');
      } else {
        console.log(result);
        login.error = "Invalid credentials.  Please try again."
      }
    })
  };
});

angular.module('app').controller('signUpController', function($http, userInfo, $state, authService){
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
    // if(!fields || !pw){
    //   $state.transitionTo($state.current, {}, {reload: false});
    // }
    signup.user = {
      username: signup.username,
      firstName: signup.firstName,
      lastName: signup.lastName,
      password: signup.password,
      email: signup.email
    };
    if(fields && pw){
      $http.post('/users', JSON.stringify(signup.user)).then(function(user){
        var creds = {
          username: user.data.username,
          password: signup.user.password
        }
        authService.login(creds, function(result){
          if(result === true){
            $state.go('welcomeUser');
          } else {
            throw new Error('Invalid Information.');
            $state.go('home.login');
          }
        })
      }).catch(function(e){
        console.log(e);
        signup.error = "Something went wrong! " + e.statusText;
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

angular.module('app').controller('welcomeController', function(userInfo, $state, $http, $localStorage, authService){
  var welcome = this;
  welcome.firstName = $localStorage.currentUser.firstName;
  welcome.lastName = $localStorage.currentUser.lastName;
  welcome.username = $localStorage.currentUser.username;
  welcome.email = $localStorage.currentUser.email;
  welcome.logout = function(){
    $http.delete('/users/login').then(function(status){
      console.log('status: ', status);
      delete status.config.headers.Auth;
      authService.Logout();
      $state.go('home.login');
    });
    //add only if successfully logged out
    // $state.go('home.login');
  }
});
