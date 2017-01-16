angular.module('app', ['ui.router', 'ngCookies', 'ngMaterial', 'ngStorage'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $localStorage){
    $httpProvider.interceptors.push(function($location, $localStorage, $state, $q){
      return {
        'request': function(config){
          config.headers = config.headers || {};
          if($localStorage.token){
            config.headers.Authorization = 'Bearer' + $localStorage.token;
          }
          return config;
        },
        'responseError': function(response){
          if(response.status === 401 || response.status === 403){
            $state.go('home.login');
          }
          return $q.reject(response);
        }
      }
    });
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
  .factory('authenticationService', function($http, $localStorage){
     var authService = {};
     authService.login = function(creds, cb){
       $http.post('/users/login', JSON.stringify(creds))
        .then(function(res){
          if(res.token){
            $localStorage.currentUser = creds;
            $localStorage.currentUser.token = res.token;
            $http.defaults.headers.common.Auth = res.token;
            cb(true);
          } else {
            cb(false);
          }
        }).catch(e){
          console.log(e);
        }
     };
     authService.Logout = function() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Auth = '';
          };
     return authService;
  });


angular.module('app').controller('homeController', function(){
  var home = this;
  home.message = "This is a simple demonstration of the authorization process in Node.  This authorization was done by using password encryption and utilizing JSON web tokens.  You will be able to sign up, log in, see your information, and log out."
});

angular.module('app').controller('loginController', function($http, userInfo, $state, authenticationService){
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
    authenticationService.login(creds, function(result){
      if(result === 'true'){
        $state.go('welcomeUser');
      } else {
        login.error = "Invalid credentials.  Please try again."
      }
    })
  };
});

angular.module('app').controller('signUpController', function($http, userInfo, $state){
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
        userInfo.setUserData(user.data);
        authenticationService.login(user.data, function(result){
          if(result === 'true'){
            $state.go('welcomeUser');
          } else {
            throw new Error('Invalid Information.');
          }
        })
        // $state.go('home.login');
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

app.controller('welcomeController', function(userInfo, $state, $http, $localStorage, authenticationService){
  var welcome = this;
  welcome.firstName = userInfo.userInstance.firstName;
  welcome.lastName = userInfo.userInstance.lastName;
  welcome.username = userInfo.userInstance.username;
  welcome.email = userInfo.userInstance.email;
  welcome.logout = function(){
    $http({
 method: 'DELETE',
 url: '/users/login'
})
.then(function(status){
      console.log('status: ', status);
      authenticationService.Logout();
    });
    //add only if successfully logged out
    // $state.go('home.login');
  }
});
