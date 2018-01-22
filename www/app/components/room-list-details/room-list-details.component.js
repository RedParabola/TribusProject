angular.module('starter.components', [])
  .directive('roomListDetails', roomListDetailsDirective);

function roomListDetailsDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      room: '=',
      closeFunction: '='
    },
    controller: roomListDetailsController,
    controllerAs: 'roomDetailsCtrl',
    templateUrl: 'app/components/room-list-details/room-list-details.html'
  };
}

roomListDetailsController.$inject = ['$scope'];
function roomListDetailsController($scope) {
  
  var vm = this;
  
  initialize();

  //////////////////

  function initialize() {
    vm.listOfActors = '';
    $scope.$watch('roomDetailsCtrl.room',layoutDetails);
  }
  
  function layoutDetails(newValue,oldValue){
    if(!newValue){
      vm.listOfActors = '';
    } else {
      if(newValue !== oldValue){
        vm.listOfActors = '';        
      }
      angular.forEach(vm.room.actors,function(actor,index){
        vm.listOfActors = vm.listOfActors.concat(actor.name);
        if(index !== vm.room.actors.length - 1){
          vm.listOfActors = vm.listOfActors.concat(', ');          
        }
      });
    }      
  }
}