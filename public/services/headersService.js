angular.module('app').factory('headersService', function($location, $localStorage, $injector){
  var headersSvc = {};
    headersSvc.request = function(config){
      config.headers = config.headers || {};
      if($localStorage.currentUser){
        if($localStorage.currentUser.token){
          var http = $injector.get('$http');
          http.defaults.headers.common.Auth = $localStorage.currentUser.token;
       } else {
         $injector.get('$state').go('home.login');
       }
      }
      return config;
    };
    headersSvc.responseError = function(response){
      if(response.status === 401 || response.status === 403){
        return $location.state('home.login');
      }
    }; //end responseError
  return headersSvc;
}); //end
