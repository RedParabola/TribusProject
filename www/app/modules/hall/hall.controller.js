angular
.module('starter.controllers', [])
.controller('HallController', hallController);

hallController.$inject = ['$rootScope', '$scope', '$log', '$state', '$ionicHistory', '$cordovaBarcodeScanner', '$timeout'];
function hallController($rootScope, $scope, $log, $state, $ionicHistory, $cordovaBarcodeScanner, $timeout) {

  var vm = this;
  vm.scanBarCode = _scanBarCode;
  vm.goToJoiningRoom = _goToJoiningRoom;
  vm.createNewRoom = _createNewRoom;
  
  initialize();

  //////////////////

  function initialize(){

  }

  function _scanBarCode(){
    $timeout(function(){
      $cordovaBarcodeScanner.scan().then(
        function(barcodeData) {
          alert(barcodeData.text);
          $log.info("Barcode Format -> " + barcodeData.format);
          $log.info("Cancelled -> " + barcodeData.cancelled);
        }, function(error) {
          $log.info("An error happened -> " + error);
      });
    }, 500);
  }

  function _goToJoiningRoom(){
    $ionicHistory.nextViewOptions({
      disableBack : false
    });
    $state.go('joining-room');
  }

  function _createNewRoom(){
    $ionicHistory.nextViewOptions({
      disableBack : false
    });
    $state.go('room-creation-wizard');
  }

  function joinRoom(){
    $ionicHistory.nextViewOptions({
      disableBack : true
    });
    $state.go('tab.dash', {roomId: 'a0b1c2d3e4f5f6789'});    
  }
}