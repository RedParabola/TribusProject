angular
.module('starter.controllers')
.controller('RoomListController', roomListController);

roomListController.$inject = ['$rootScope', '$scope', '$log', '$state', 'RoomService'];
function roomListController($rootScope, $scope, $log, $state, RoomService) {

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
      vm.selectedRoom = room;
    } else if (room.id === vm.selectedRoom.id){
      vm.selectedRoom = undefined;
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