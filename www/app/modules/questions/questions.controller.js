angular
  .module('starter.controllers')
  .controller('QuestionsController', questionsController);

  questionsController.$inject = ['$scope'];
  function questionsController($scope) {

    var vm = this;

    initialize();

    //////////////////

    function initialize(){
      vm.settings = {
        enableRandom: true
      };
    }
    
  }