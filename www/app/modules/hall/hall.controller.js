angular
.module('starter.controllers', [])
.controller('HallController', hallController);

hallController.$inject = ['$rootScope', '$scope', '$log', '$state', '$cordovaBarcodeScanner', '$timeout'];
function hallController($rootScope, $scope, $log, $state, $cordovaBarcodeScanner, $timeout) {

  var vm = this;
  vm.createNewRoom = _createNewRoom;
  vm.scanBarCode = _scanBarCode;    
  vm.inputKeyCode = _inputKeyCode;    
  
  initialize();

  //////////////////

  function initialize(){

  }

  function _createNewRoom(){
    $state.go('room-creation-wizard');
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

  function _inputKeyCode(){
    $log.info("Should unveil or popup an input to introduce the room key code");    
  }

  function joinRoom(){

  }

}