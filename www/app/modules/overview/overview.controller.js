angular
  .module('starter.controllers')
  .controller('OverviewController', overviewController);

  overviewController.$inject = ['$scope', 'OverviewStatsService', 'TestService', '$log'];
  function overviewController($scope, OverviewStatsService, TestService, $log) {

    var vm = this;
    //vm.test = _test;

    initialize();

    //////////////////

    function initialize(){
      vm.title = 'Generic title';
      vm.rooms = OverviewStatsService.getLinkedRooms();
    }

    /*
    function _test(){
      TestService.getAllTVShows().then(
        function(shows){
          vm.testShows = shows;
        },
        function (error){
          $log.info('Unable to retrieve tvshows.');
        }
      );
    }
    */

  }