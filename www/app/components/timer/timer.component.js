angular
  .module('starter.components')
  .directive('customTimer', timerDirective);

function timerDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    require: ['ngModel'],
    bindToController: {
      timerId: '=',
      totalTime: '=',
      actualRunningTimer: '=',
      broadcastFunction: '='
    },
    controller: timerController,
    controllerAs: 'timerCtrl',
    templateUrl: 'app/components/timer/timer.html'
  };
}

timerController.$inject = ['$scope'];
function timerController($scope) {
  var vm = this;
  
  initialize();
  vm.toggleTimer = _toggleTimer;

  //////////////////////////////

  function initialize() {
    vm.hasStarted = false;
    vm.isThisRunning = false;
    vm.lapsedSeconds = 0;
    vm.allSessionTime = 0;
    $scope.$watch('timerCtrl.actualRunningTimer',checkPauseTimer);
    $scope.$on('timer-tick', onTimeTick);
  }

  function _toggleTimer(){
    if(!vm.isThisRunning){
      startTimer();
    } else {
      stopTimer();
    }
  }

  function checkPauseTimer(newValue,oldValue){
    if(newValue !== oldValue){
      if(newValue !== vm.timerId){
        if(vm.isThisRunning){
          stopTimer();
        }
      }
    }
  }

  function startTimer(){
    $scope.$broadcast('timer-start');
    vm.broadcastFunction(vm.timerId);
    vm.hasStarted = true;
    vm.isThisRunning = true;
  }

  function stopTimer(){
    $scope.$broadcast('timer-stop');
    vm.isThisRunning = false;
    vm.allSessionTime = vm.allSessionTime + vm.lapsedSeconds*1000;
    vm.totalTime = moment.utc(vm.allSessionTime).format("HH:mm:ss");
  }

  function onTimeTick(event, data) {
    vm.lapsedSeconds = data.millis/1000;
  }

}