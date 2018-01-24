angular
  .module('starter.controllers')
  .controller('OverviewController', overviewController);

  overviewController.$inject = ['$rootScope', '$scope', 'OverviewStatsService', '$log', '$stateParams'];
  function overviewController($rootScope, $scope, OverviewStatsService, $log, $stateParams) {

    var vm = this;
    $scope.isUserModerator = $rootScope.user.isUserModerator;
    vm.roomId = $stateParams.roomId;

    initialize();

    //////////////////

    function initialize(){
      makeCode();
      //vm.rooms = OverviewStatsService.getLinkedRooms();
    }

    function makeCode(){
      var elemCode = document.getElementById('qrcode');
      var qrcode = new QRCode(elemCode, {
        width: 128,
        height: 128,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
      });
      qrcode.clear();
      qrcode.makeCode(vm.roomId);
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