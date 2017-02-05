angular.module('app').controller('aboutController', function($state){
  console.log('The about controller is connected.');
  var about = this;
  about.goHome = function(){
    $state.go('home.login');
  }
});
