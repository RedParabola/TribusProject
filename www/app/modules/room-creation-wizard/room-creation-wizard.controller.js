angular
.module('starter.controllers')
.controller('RoomCreationWizardController', roomCreationWizardController);

roomCreationWizardController.$inject = ['$rootScope', '$scope', '$log', '$state', 'CategoryConstants', 'PopupService'];
function roomCreationWizardController($rootScope, $scope, $log, $state, CategoryConstants, PopupService) {

  var vm = this;
  vm.addNewActor = _addNewActor;
  vm.removeActor = _removeActor;
  var textToEncode = 'OMG! Tits';
  vm.makeCode = _makeCode;
  vm.categories = [];
  
  initialize();

  //////////////////

  function initialize(){
    vm.categories = CategoryConstants;
    vm.actors = [
      {
        name:'SGAE',
        sentence: 'Brief sentence.'
      },
      {
        name:'NSA',
        sentence: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'
      },
      {
        name:'NETFLIX',
        sentence: 'Brief sentence about the actor. A bit longer.'
      }
    ];
  }



  function _addNewActor(){
    //TODO: Insert new name/sentence
    
    var actorAlreadyExistent = _.find(vm.actors,function(actor){
      return vm.newActorName = actor.name;
    });
    if(actorAlreadyExistent){
      PopupService.getAlertPopup(
        'Actor ' + vm.newActorName + ' already exists!',
        'Please add another actor that is not already present in the list.'
      );
      vm.newActorName = undefined;
      vm.newActorSentence = undefined;
    } else {
      vm.actors.push({
        name: vm.newActorName,
        sentence: vm.newActorSentence
      });
    }
  }

  function _removeActor(actor){
    vm.actors = _.without(vm.actors,actor);
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