var app = angular.module('app');
  app.controller('signUpController', function($http, userInfo, $state){
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
          $state.go('home.login');
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

app.controller('welcomeController', function(userInfo, $state, $http, $cookies){
  var welcome = this;
  welcome.firstName = userInfo.userInstance.firstName;
  welcome.lastName = userInfo.userInstance.lastName;
  welcome.username = userInfo.userInstance.username;
  welcome.email = userInfo.userInstance.email;
  welcome.logout = function(){
    $http({
 method: 'DELETE',
 url: '/users/login',
 headers: {
   'Auth': $cookies.get('Auth')
 }
})
.then(function(status){
      console.log('status: ', status);
    });
    //add only if successfully logged out
    // $state.go('home.login');
  }
});

app.controller('homeController', function(){
  var home = this;
  home.message = "This is a simple demonstration of the authorization process in Node.  This authorization was done by using password encryption and utilizing JSON web tokens.  You will be able to sign up, log in, see your information, and log out."
});

app.controller('loginController', function($http, userInfo, $state, $cookies){
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

    $http.post('users/login', JSON.stringify(creds)).then(function(user){
      if(!user.data.firstName){
        login.error = "Incorrect " + type + " or Password.";
      } else {
        console.log(user.headers('Auth'));
        $cookies.put('Auth', user.headers('Auth'));
        userInfo.userInstance = user.data;
        console.log(userInfo.userInstance);
        $state.go('welcomeUser');
      }
    })
  };






})
