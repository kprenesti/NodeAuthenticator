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
        authService.login(user.data, function(result){
          if(result === true){
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
