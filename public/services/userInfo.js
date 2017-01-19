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
