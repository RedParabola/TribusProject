angular
.module('starter.controllers')
.controller('RegisterController', registerController);

registerController.$inject = ['$rootScope', '$log', 'RegisterService', '$timeout'];
function registerController($rootScope, $log, RegisterService, $timeout) {

  var vm = this;
  vm.validateField = _validateField;
  vm.doRegister = _doRegister;    

  initialize();

  //////////////////

  function initialize(){
    
  }

  function _validateField(){

  }

  function _doRegister(){
    $timeout(function(){
      RegisterService.tryRegister().then(
        function(userInfo) {
          $log.info("Register successful");
        }, function(error) {
          $log.info("Register failed -> " + error);
      });
      
    },  100);
  }
}