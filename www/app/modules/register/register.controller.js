angular
.module('starter.controllers')
.controller('RegisterController', registerController);

registerController.$inject = ['$rootScope', '$log', 'UserService', '$timeout', '$ionicHistory', '$state'];
function registerController($rootScope, $log, UserService, $timeout, $ionicHistory, $state) {

  var vm = this;
  vm.validateField = _validateField;
  vm.doRegister = _doRegister;
  vm.goToTermsOfService = _goToTermsOfService;
  
  initialize();

  //////////////////

  function initialize(){
    vm.isUserAnonymous = true;
  }

  function _validateField(){

  }

  function _doRegister(){
    $timeout(function(){
      UserService.tryRegister(vm.email,vm.password).then(
        function() {
          $log.info("Register successful");
          $ionicHistory.nextViewOptions({
            disableBack : true,
            historyRoot: true
          });
          $state.go('login', {});  
        }, function(error) {
          $log.info("Register failed -> " + error);
      });
    },  200);
  }

  function _goToTermsOfService(){
    $ionicHistory.nextViewOptions({
      disableBack : false
    });
    $state.go('tos', {});    
  }

}