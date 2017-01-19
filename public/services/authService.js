angular.module('app').factory('authenticationService', authService);

function authService ($http, $localStorage){
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
}
