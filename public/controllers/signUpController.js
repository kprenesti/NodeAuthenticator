angular.module('app').controller('signUpController', function($http, userInfo, $state, authService){
  var signup = this;
  signup.error = "";

  signup.checkAllFields = function(username, firstName, lastName, email, password1, password2){
    if(!username || !firstName || !lastName || !email || !password1 || !password2){
      signup.error = "Please fill in all fields."
      return false;
     }
     var regex = /[^\w \-]+/g;
     if(regex.test(username)){
       signup.error = 'Username must be at least 5 characters and be alphanumeric.';
       return false;
     } 
    if(/[^[A-z \-]/g.test(firstName) === true || /[^[A-z ]/g.test(lastName) === true){
       signup.error = 'First and Last name must be at least 2 characters and only contain letters and spaces.';
       return false;
     } 
        
    return true; 
  };

  signup.checkPassword = function(pw1, pw2){
    if(pw1 && pw2){
      if(pw1 === pw2 && pw1.length >= 6){
        signup.password = pw1;
        return true;
      } else if(pw1 != pw2) {
        signup.error = "Passwords don't match!"
        return false;
      } else if(pw1.length < 6){
        signup.error = "Passwords must be at least 6 characters."
      }
    } else if(!pw1 || !pw2) {
      signup.error = "Please enter a valid password."
      return false;
    }
  };

  signup.checkFields = function(){
    var fields = signup.checkAllFields(signup.username, signup.firstName, signup.lastName, signup.email, signup.password1, signup.password2);
    var pw;
    if(fields === true){
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
        if(user){
          var creds = {
            username: user.data.username,
            password: signup.user.password
          }
          authService.login(creds, function(result){
            if(result === true){
              $state.go('welcomeUser');
            } else {
              throw new Error('Invalid Inputs.');
              $state.go('home.login');
            } 
          });
        } else {
          throw new Error ('Error. Something went wrong.  Please check your input and try again.')
        } //end if user
      }, function(error){
        console.log(error);
        signup.error = "Something went wrong! " + error.statusText;
      })
      console.log(fields, pw);
    }


    // $http.post('/users', signup.user).then(function(user){
    //   userInfo.setUserData(user);
    //   console.log(user);
    // })
  }
});
