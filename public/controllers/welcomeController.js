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
