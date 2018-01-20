angular
.module('starter.controllers', [])
.controller('HallController', hallController);

hallController.$inject = ['$rootScope', '$scope', '$log', '$state', '$ionicHistory', '$cordovaBarcodeScanner', '$timeout', 'RoomService', 'PopupService', 'CategoryConstants', 'RoomStatusConstants'];
function hallController($rootScope, $scope, $log, $state, $ionicHistory, $cordovaBarcodeScanner, $timeout, RoomService, PopupService, CategoryConstants, RoomStatusConstants) {

  var vm = this;
  vm.scanBarCode = _scanBarCode;
  vm.goToRoomList = _goToRoomList;
  vm.createNewRoom = _createNewRoom;
  vm.filterSearch = _filterSearch;
  vm.toggleRoomDetails = _toggleRoomDetails;
  vm.popupKeycodeInput = _popupKeycodeInput;

  var sliderItem;
  
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

  function _scanBarCode(){
    $timeout(function(){
      if(window.cordova){
        $cordovaBarcodeScanner.scan().then(
          function(barcodeData) {
            alert(barcodeData.text);
            $log.info("Barcode Format -> " + barcodeData.format);
            $log.info("Cancelled -> " + barcodeData.cancelled);
            joinRoom();
          }, function(error) {
            $log.info("An error happened -> " + error);
        });
      } else {
        $log.info("Cordova only exists on device");
      }
    }, 500);
  }

  function _goToRoomList(){
    sliderItem.slideTo(1, 250);
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

  $scope.$on('$ionicSlides.sliderInitialized', function (event, data) {
    // data.slider is the instance of Swiper
    sliderItem = data.slider;
    $log.info('Slider initialized at ' + sliderItem.activeIndex);
  });

  $scope.$on('$ionicSlides.slideChangeStart', function (event, data) {
    $log.info('Slide change is beginning, from ' + sliderItem.previousIndex + ' to ' + sliderItem.activeIndex);
    if(sliderItem.previousIndex === 1){ slideOutOfList(); }
  });

  $scope.$on('$ionicSlides.slideChangeEnd', function (event, data) {
    $log.info('Slide change ended, from ' + sliderItem.previousIndex + ' to ' + sliderItem.activeIndex);
  });

  function slideOutOfList(){
    vm.shouldShowDetails = false;
    $timeout(function(){
      vm.selectedRoom = undefined;
    },250);
  }
}