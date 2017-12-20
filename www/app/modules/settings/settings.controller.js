angular
  .module('starter.controllers')
  .controller('SettingsController', settingsController);

  settingsController.$inject = ['$scope'];
  function settingsController($scope) {

    var vm = this;

    initialize();

    //////////////////

    function initialize(){
      vm.settings = {
        enableRandom: true
      };
    }
    
  }