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
