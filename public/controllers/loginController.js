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
