angular
  .module('starter.controllers')
  .controller('DashController', dashController);

  dashController.$inject = ['$rootScope', '$scope', '$log', '$interval', 'RoomService', '$stateParams'];
  function dashController($rootScope, $scope, $log, $interval, RoomService, $stateParams) {

    Chart.defaults.global.colors = ['#e57373','#BA68C8','#FFD54F','#81C784','#64B5F6','#90A4AE','#7986CB'];

    var vm = this;
    vm.voteActor = _voteActor;
    vm.roomId = $stateParams.roomId;
    $scope.isUserModerator = $rootScope.user.isUserModerator;
    vm.pollingInterval;
    initialize();

    //////////////////

    function initialize(){
      vm.userHasVoted = false;
      $scope.$on('$ionicView.beforeEnter',function () {
        //Initialize room
        RoomService.getRoomInfo(vm.roomId).then(initializeInfo);

        //Polling interval
        pollingInterval = $interval(function () {
          RoomService.getRoomStats(vm.roomId).then(updateStatus);
        }, 20000);

        $scope.$on('$ionicView.beforeLeave',function () {
          $interval.cancel(pollingInterval);
        });
        
      });
    }

    function initializeInfo(info) {
      vm.selectedRoom = info;
      vm.selectedRoom.data = [];
      vm.selectedRoom.labels = [];
      vm.selectedRoom.actors.forEach(function(actor,key) {
        vm.selectedRoom.labels.push(actor.name);
        actor.color = {'background-color': Chart.defaults.global.colors[key]};
        actor.votedByUser = false;
      }, this);
    }

    function updateStatus(votesArray) {
      vm.selectedRoom.data = votesArray;
      vm.userHasVoted = false;
      vm.selectedRoom.actors.forEach(function(actor,key) {
        actor.votedByUser = false;
      }, this);
    }

    function _voteActor(actor){
      if(!vm.userHasVoted){
        if(actor > 0 && actor <= vm.selectedRoom.actors.length){
          vm.userHasVoted = true;
          vm.selectedRoom.data[actor]++;
          vm.selectedRoom.actors[actor].votedByUser = true;
          $log.info('User voted actor: ' + vm.selectedRoom.actors[actor].name);
        }
      }
    }

  }