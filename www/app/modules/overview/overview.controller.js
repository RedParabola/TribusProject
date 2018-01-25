angular
  .module('starter.controllers')
  .controller('OverviewController', overviewController);

overviewController.$inject = ['$rootScope', '$scope', '$log', '$stateParams', '$state', '$ionicHistory', 'PopupService', '$timeout'];
function overviewController($rootScope, $scope, $log, $stateParams, $state, $ionicHistory, PopupService, $timeout) {

  var vm = this;
  $scope.isUserModerator = $rootScope.user.isUserModerator;
  vm.roomId = $stateParams.roomId;
  vm.anonymousToggle = _anonymousToggle;
  vm.doLogout = _doLogout;
  vm.leaveRoom = _leaveRoom;
  vm.expandQR = _expandQR;

  initialize();

  //////////////////

  function initialize(){
    vm.userEmail = $rootScope.user.email;
    vm.isAnonymous = $rootScope.user.isUserAnonymous;
    vm.isQRFullscreen = false;
    makeCode();
  }

  function makeCode(){
    var idToParse = 'smallqr';
    if(vm.isQRFullscreen){
      idToParse = 'bigqr';
    }
    var elemCode = document.getElementById(idToParse);
    var qrcode = new QRCode(elemCode, {
      width: 128,
      height: 128,
      colorDark : '#000000',
      colorLight : '#ffffff',
      correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.clear();
    qrcode.makeCode(vm.roomId);
  }

  function _expandQR(){
    var fullscreenQRPopup = PopupService.getQRPopup($scope,'Fullscreen Room QR');
    vm.isQRFullscreen = true;
    fullscreenQRPopup.then(function(res){
      vm.isQRFullscreen = false;
    });
    $timeout(function(){
      makeCode()
    },400);
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