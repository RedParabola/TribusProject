angular
  .module('starter.controllers')
  .controller('TimersController', timersController);

  timersController.$inject = ['$scope'];
  function timersController($scope) {

    var vm = this;

    initialize();

    //////////////////

    function initialize(){
      vm.settings = {
        enableRandom: true
      };
    }
    
  }