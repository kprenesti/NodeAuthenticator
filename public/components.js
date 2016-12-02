angular.module('app')
  .component('home.login', {

  })
  .component('home.signUp', {
    templateUrl: './templates/signUp.html',
    controller: 'signUpController as signUp',
    bindings: {
      user: '<'
    }
  })
