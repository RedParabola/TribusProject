angular
.module('starter.controllers')
.controller('LoginController', loginController);

loginController.$inject = ['$rootScope', '$log', 'LoginService', '$timeout', '$ionicHistory', '$state', '$ionicPopup'];
function loginController($rootScope, $log, LoginService, $timeout, $ionicHistory, $state, $ionicPopup) {

  var vm = this;
  vm.validateField = _validateField;
  vm.doLogin = _doLogin;
  vm.goToRegister = _goToRegister;

  initialize();

  //////////////////

  function initialize(){
    $rootScope.users = [];    
  }

  function _validateField(){

  }

  function _doLogin(){
    $timeout(function(){
      LoginService.tryLogin(vm.email,vm.password).then(
        function(userInfo) {
          setupUserInfoAccount(userInfo);
          goToHall();
        }, function(error) {
          $log.info("Login fail error: " + error);
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Either connection has a problem, either your credentials are wrong.'
        });
      });
    },  100);
  }

  function setupUserInfoAccount(userInfo){
    $log.info("Login successful. User profile -> " + userInfo);
    //Should setup user info account
  }

  function _goToRegister(){
    $ionicHistory.nextViewOptions({
      disableBack : false
    });
    $state.go('register');    
  }

  function goToHall(){
    $ionicHistory.nextViewOptions({
      disableBack : true
    });
    $state.go('hall');    
  }
}