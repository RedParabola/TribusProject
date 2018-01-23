angular
  .module('starter.controllers')
  .controller('DashController', dashController);

  dashController.$inject = ['$rootScope', '$scope', '$log', '$interval', 'RoomService', '$stateParams'];
  function dashController($rootScope, $scope, $log, $interval, RoomService, $stateParams) {

    var vm = this;
    vm.voteActor = _voteActor;
    vm.roomId = $stateParams.roomId;
    $scope.isUserModerator = $rootScope.user.isUserModerator;
    initialize();

    //////////////////

    function initialize(){

      $scope.$on('$ionicView.beforeEnter',function () {
        //Initialize room
        RoomService.getRoomInfo(vm.roomId).then(initializeInfo);

        //Polling interval
        var pollingInterval = $interval(function () {
          RoomService.getRoomStats(vm.roomId).then(updateStatus);
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