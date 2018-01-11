angular
.module('starter.controllers')
.controller('JoiningRoomController', joiningRoomController);

joiningRoomController.$inject = ['$rootScope', '$scope', '$log', '$state', '$ionicHistory', '$timeout', 'RoomService', 'PopupService', 'CategoryConstants', 'RoomStatusConstants'];
function joiningRoomController($rootScope, $scope, $log, $state, $ionicHistory, $timeout, RoomService, PopupService, CategoryConstants, RoomStatusConstants) {

  var vm = this;
  var textToEncode = 'OMG! Tits';
  vm.filterSearch = _filterSearch;
  vm.toggleRoomDetails = _toggleRoomDetails;
  vm.popupKeycodeInput = _popupKeycodeInput;
  
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
        angular.forEach(vm.existingRooms,function(room){
          room.categoryText = CategoryConstants[room.category].text;
          room.categoryIcon = CategoryConstants[room.category].icon;
          room.globalColor = room.category.toLowerCase();
          room.statusText = RoomStatusConstants[room.status].text;
          room.statusTextColor = RoomStatusConstants[room.status].textColor;
          room.statusGlobal = RoomStatusConstants[room.status].roomPhase;
        });
      }, function(error){
        $log.info('Could not retrieve the list of rooms');
    });
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
      },250);
    } else {
      vm.selectedRoom = room;
    }
  }

  function _popupKeycodeInput(){
    if(!vm.selectedRoom.private){
      joinRoom();
    } else {
      vm.roomCode = undefined;
      var codePopup = PopupService.getPasswordPopup(
        $scope,
        'roomListCtrl.roomCode',
        'Room Code',
        "Please enter the 8 alphanumeric characters of this room's code"
      );
      //Show the popup and wait for results
      codePopup.then(function(res){
        if(res){
          RoomService.checkRoomCode(vm.selectedRoom.id,vm.roomCode).then(
            function(){
              joinRoom();
            }, function (error){
              var alertPopup = PopupService.getAlertPopup(
                'Not possible to join the room.',
                'The room code you introduced is wrong.'
              );
              alertPopup.then(function(res) {
                $log.info('Wrong code');
              });
            }
          )
        }
      });
    }
  }

  function joinRoom(){
    $ionicHistory.nextViewOptions({
      disableBack : true
    });
    $state.go('tab.dash', {roomId: 'a0b1c2d3e4f5f6789'});
  }
}