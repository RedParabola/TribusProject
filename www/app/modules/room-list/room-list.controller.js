angular
.module('starter.controllers')
.controller('RoomListController', roomListController);

roomListController.$inject = ['$rootScope', '$scope', '$log', '$state', 'RoomService', '$timeout'];
function roomListController($rootScope, $scope, $log, $state, RoomService, $timeout) {

  var vm = this;
  var textToEncode = 'OMG! Tits';
  vm.filterSearch = _filterSearch;
  vm.toggleRoomDetails = _toggleRoomDetails;
  
  initialize();

  //////////////////

  function initialize(){
    vm.existingRooms = [];
    vm.searchField = undefined;
    vm.selectedRoom = undefined;
    vm.shouldShowDetails = false;
    
    //TODO: Retrieve list of existing rooms
    RoomService.getExistentRooms().then(
      function(rooms){
        vm.existingRooms = rooms;
      }, function(error){
        $log.info('Could not retrieve the list of rooms');
    });
    //TODO: Execute related actions
  }

  function _filterSearch(){
    //TODO: Filter the list by searchField
  }

  function _toggleRoomDetails(room){
    if(!vm.selectedRoom){
      vm.shouldShowDetails = true;
      vm.selectedRoom = room;
    } else if (room.id === vm.selectedRoom.id){
      vm.shouldShowDetails = false;
      $timeout(function(){
        vm.selectedRoom = undefined;
      },200);
    } else {
      vm.selectedRoom = room;
    }
  }

  function popupKeycodeInput(){
    //TODO: Popup input to introduce the room keycode
  }

  function joinRoom(){
    $state.go('tab.dash', {roomId: 'a0b1c2d3e4f5f6789'});
  }
}