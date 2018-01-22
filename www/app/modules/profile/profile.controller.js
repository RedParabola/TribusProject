angular
  .module('starter.controllers')
  .controller('ProfileController', profileController);

  profileController.$inject = ['$scope'];
  function profileController($scope) {

    var vm = this;

    initialize();

    //////////////////

    function initialize(){
      vm.settings = {
        enableRandom: true
      };
    }
    
  }