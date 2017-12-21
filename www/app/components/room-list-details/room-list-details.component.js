angular.module('starter.components', [])
  .directive('roomListDetails', roomListDetailsDirective);

function roomListDetailsDirective() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: {
      room: '='
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
    
  }
  
}