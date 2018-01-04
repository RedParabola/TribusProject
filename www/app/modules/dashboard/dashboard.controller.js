angular
  .module('starter.controllers')
  .controller('DashController', dashController);

  dashController.$inject = ['$scope', '$log', '$interval', 'RoomService'];
  function dashController($scope, $log, $interval, RoomService) {

    var vm = this;
    vm.voteActor = _voteActor;

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
      vm.selectedRoom.actors.forEach(function(actor) {
      vm.selectedRoom.labels.push(actor.name);
      }, this);
    }

    function updateStatus(votesArray) {
      vm.selectedRoom.data = votesArray;
    }

    function _voteActor(actor){
      if(actor > 0 && actor <= vm.selectedRoom.actors.length){
        vm.selectedRoom.data[actor]++;
      }
      $log.info('User voted actor: ' + vm.selectedRoom.actors[actor].name);
    }

  }