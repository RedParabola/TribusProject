angular
  .module('starter.controllers')
  .controller('ProfileController', profileController);

profileController.$inject = ['$rootScope', '$scope', '$state', '$ionicHistory'];
function profileController($rootScope, $scope, $state, $ionicHistory) {

  var vm = this;
  vm.anonymousToggle = _anonymousToggle;
  vm.doLogout = _doLogout;
  vm.leaveRoom = _leaveRoom;

  initialize();

  //////////////////

  function initialize(){
    vm.userEmail = $rootScope.user.email;
    vm.isAnonymous = $rootScope.user.isUserAnonymous;
  }
  
  function _anonymousToggle(){
    $rootScope.user.isUserAnonymous = vm.isAnonymous;
  }

  function _doLogout(){
    $rootScope.user = undefined;
    $ionicHistory.nextViewOptions({
      disableBack : true,
      historyRoot: true
    });
    $state.go('login');    
  }

  function _leaveRoom(){
    $rootScope.user.isUserModerator = undefined;
    $ionicHistory.nextViewOptions({
      disableBack : true,
      historyRoot: true
    });
    $state.go('hall');  
  }

}