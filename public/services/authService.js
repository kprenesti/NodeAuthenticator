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
