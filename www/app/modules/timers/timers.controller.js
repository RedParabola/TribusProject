angular
  .module('starter.controllers')
  .controller('TimersController', timersController);

  timersController.$inject = ['$rootScope', '$scope', 'RoomStatusConstants'];
  function timersController($rootScope, $scope, RoomStatusConstants) {

    var vm = this;
    vm.nextPhase = _nextPhase;

    initialize();

    //////////////////

    function initialize(){
      vm.actors = $rootScope.actualRoom.actors;
      vm.debatePhases = $rootScope.actualRoom.phases;
      _.each(vm.debatePhases,function(eachPhase){
        angular.extend(eachPhase,RoomStatusConstants[eachPhase.phase.toUpperCase()]);
      });
    }

    function _nextPhase(){
      vm.debatePhases = _.without(vm.debatePhases,vm.debatePhases[0]);
    }
  }