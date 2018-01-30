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
      vm.debateTimer = 10;
      vm.totalDebateTime = '00:00:00';
      vm.nextTurnValue = 1;
      vm.actors = $rootScope.actualRoom.actors;
      _.each(vm.actors,function(eachActor,key){
        angular.extend(eachActor,{
          totalTime: '00:00:00',
          requestedTurn: false,
          turn: 0
        });
        $scope.$watch('timersCtrl.actors['+key+'].requestedTurn',function(){
          if(eachActor.requestedTurn){
            checkTurns(eachActor);
          }
        });
      });
    }

    function _nextPhase(){
      vm.debatePhases = _.without(vm.debatePhases,vm.debatePhases[0]);
      _thisTimerStarted(vm.debateTimer);//The global debate timer is 10
    }

    function _thisTimerStarted(timerId){
      vm.actualRunningTimer = timerId;
      if(timerId !== vm.debateTimer) {
        _.each(vm.actors,function(eachActor,key){
          eachActor.turn--;
        });
        if(vm.nextTurnValue > 0){
          vm.nextTurnValue--;
        }
      }
    }

    function checkTurns(actor){
      vm.nextTurnValue++;
      actor.turn = vm.nextTurnValue;
    }

  }