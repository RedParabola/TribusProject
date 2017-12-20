angular
  .module('starter.controllers')
  .controller('DashController', dashController);

  dashController.$inject = ['$scope', '$log', '$interval', 'RoomService'];
  function dashController($scope, $log, $interval, RoomService) {

    var vm = this;
    vm.voteOption = _voteOption;

    initialize();

    var roomId = 12345;
    //////////////////

    function initialize(){

      $scope.$on('$ionicView.beforeEnter',function () {
        //Initialize room
        RoomService.getRoomInfo(roomId).then(initializeInfo);

        //Polling interval
        var pollingInterval = $interval(function () {
          RoomService.getRoomStats(roomId).then(updateStatus);
          $log.info('Polling interval');        
        }, 3000);

        $scope.$on('$ionicView.beforeLeave',function () {
          $interval.cancel(pollingInterval);
        });
        
      });
    }

    function initializeInfo(info) {
      vm.selectedRoom = info;
      vm.selectedRoom.data = [];
      vm.selectedRoom.labels = [];
      vm.selectedRoom.options.forEach(function(option) {
      vm.selectedRoom.labels.push(option.name);
      }, this);
    }

    function updateStatus(votesArray) {
      vm.selectedRoom.data = votesArray;
    }

    function _voteOption(option){
      if(option > 0 && option <= vm.selectedRoom.options.length){
        vm.selectedRoom.data[option]++;
      }
      $log.info('User voted option: ' + vm.selectedRoom.options[option].name);
    }

  }