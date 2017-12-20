angular
.module('starter.controllers')
.controller('RoomCreationController', roomCreationController);

roomCreationController.$inject = ['$rootScope', '$scope', '$log', '$state'];
function roomCreationController($rootScope, $scope, $log, $state) {

  var vm = this;
  var textToEncode = 'OMG! Tits';
  vm.makeCode = _makeCode;
  
  initialize();

  //////////////////

  function initialize(){

  }

  function _makeCode(){
    var elemCode = document.getElementById('qrcode');
    var qrcode = new QRCode(elemCode, {
      width: 128,
      height: 128,
      colorDark : '#000000',
      colorLight : '#ffffff',
      correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.clear();
    qrcode.makeCode(textToEncode);
  }

}