angular
  .module('starter.controllers')
  .controller('TimersController', timersController);

  timersController.$inject = ['$rootScope', '$scope', 'RoomStatusConstants'];
  function timersController($rootScope, $scope, RoomStatusConstants) {

    var vm = this;
    vm.nextPhase = _nextPhase;
    vm.thisTimerStarted = _thisTimerStarted;

    initialize();

    //////////////////

    function initialize(){
      vm.debatePhases = $rootScope.actualRoom.phases;
      vm.actors = $rootScope.actualRoom.actors;
      _.each(vm.actors,function(eachActor){
        angular.extend(eachActor,{
          totalTime: '00:00:00',
        });
      });
    }

    function _nextPhase(){
      vm.debatePhases = _.without(vm.debatePhases,vm.debatePhases[0]);
    }

    function _thisTimerStarted(timerId){
      vm.actualRunningTimer = timerId;
    }

  }