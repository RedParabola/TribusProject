angular
.module('starter.controllers')
.controller('RegisterController', registerController);

registerController.$inject = ['$rootScope', '$log', 'UserService', '$timeout'];
function registerController($rootScope, $log, UserService, $timeout) {

  var vm = this;
  vm.validateField = _validateField;
  vm.doRegister = _doRegister;    
  
  initialize();

  //////////////////

  function initialize(){
    vm.isUserAnonymous = true;
  }

  function _validateField(){

  }

  function _doRegister(){
    $timeout(function(){
      UserService.tryRegister().then(
        function(userInfo) {
          $log.info("Register successful");
        }, function(error) {
          $log.info("Register failed -> " + error);
      });
      
    },  100);
  }
}