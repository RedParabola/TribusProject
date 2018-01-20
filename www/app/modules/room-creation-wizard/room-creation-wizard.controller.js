angular
.module('starter.controllers')
.controller('RoomCreationWizardController', roomCreationWizardController);

roomCreationWizardController.$inject = ['$rootScope', '$scope', '$log', '$state', '$ionicHistory', '$ionicLoading', '$ionicSlideBoxDelegate', 'CategoryConstants', 'PopupService'];
function roomCreationWizardController($rootScope, $scope, $log, $state, $ionicHistory, $ionicLoading, $ionicSlideBoxDelegate, CategoryConstants, PopupService) {

  var vm = this;
  vm.goPrevSlide = _goPrevSlide;
  vm.goNextSlide = _goNextSlide;
  vm.updateSelectedCategory = _updateSelectedCategory;
  vm.addNewActor = _addNewActor;
  vm.editActor = _editActor;
  vm.removeActor = _removeActor;
  var textToEncode = 'OMG! Tits';
  vm.makeCode = _makeCode;
  vm.categories = [];
  
  initialize();

  //////////////////

  function initialize(){
    var categoriesArray = _.keys(CategoryConstants);
    angular.forEach(categoriesArray,function(category){
      var tempCategory = CategoryConstants[category];
      tempCategory.id = category;
      vm.categories.push(tempCategory);
    });

    vm.actors = [
      {
        name:'SGAE',
        motto: 'Brief sentence.'
      },
      {
        name:'NSA',
        motto: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'
      },
      {
        name:'NETFLIX',
        motto: 'Brief sentence about the actor. A bit longer.'
      }
    ];
  }

  function _goPrevSlide(){
    vm.sliderItem.slideTo(vm.sliderItem.activeIndex - 1);
  }

  function _goNextSlide(){
    vm.sliderItem.slideTo(vm.sliderItem.activeIndex + 1);
  }

  function _updateSelectedCategory(){
    if(vm.selectedCategory){
      vm.globalColor = vm.selectedCategory.toLowerCase();
    }
  }

  function _addNewActor(){
    //1. Insert new name&motto
    vm.newActorName = undefined;
    vm.newActorMotto = undefined;
    var actorPopup = PopupService.getAddActorPopup(
      $scope,
      'roomCreationWizardCtrl.newActorName',
      'roomCreationWizardCtrl.newActorMotto',
      'New actor',
      'Write the actor\'s name. You can also add a short description of it\'s ideas.'
    );

    //Show the popup and wait for results
    actorPopup.then(function(res){
      if(res){
        var actorAlreadyExistent = _.find(vm.actors,function(actor){
          return vm.newActorName === actor.name;
        });
        //2. Check if name already exists to discard or add
        if(actorAlreadyExistent){
          var alertPopup = PopupService.getAlertPopup(
            'Actor ' + vm.newActorName + ' already exists!',
            'Please add another actor that is not already present in the list.'
          );
          alertPopup.then(function(res){
            vm.newActorName = undefined;
            vm.newActorMotto = undefined;
          });
        } else {
          vm.actors.push({
            name: vm.newActorName,
            motto: vm.newActorMotto
          });
        }
      }
    });
  }

  function _editActor(actor){
    vm.newActorName = actor.name;
    vm.newActorMotto = actor.motto;
    var editActorPopup = PopupService.getAddActorPopup(
      $scope,
      'roomCreationWizardCtrl.newActorName',
      'roomCreationWizardCtrl.newActorMotto',
      'Edit actor',
      'You can now change it\'s name or motto.'
    );
    //Show the popup and wait for results
    editActorPopup.then(function(res){
      if(res){
        var tempActor = { name: vm.newActorName, motto: vm.newActorMotto };
        //var notChanged = _.contains(vm.actors, tempActor);
        if(actor !== tempActor){
          var actorAlreadyExistent = _.find(vm.actors,function(actor){
            return vm.newActorName === actor.name;
          });
          if(actorAlreadyExistent){
            if(actorAlreadyExistent.name !== actor.name){
              var alertPopup = PopupService.getAlertPopup(
                'Actor ' + vm.newActorName + ' already exists!',
                'You cannot set the same name as another already existent actor.'
              );
              alertPopup.then(function(res){
                vm.newActorName = undefined;
                vm.newActorMotto = undefined;
              });
            } else {
              actor.name = tempActor.name;
              actor.motto = tempActor.motto;
            }
          } else {
            actor.name = tempActor.name;
            actor.motto = tempActor.motto;
          }
        }
      }
    });
  }

  function _removeActor(actor){
    vm.actors = _.without(vm.actors,actor);
  }

  function _makeCode(){
    var elemCode = document.getElementById('qrcode');
    var qrcode = new QRCode(elemCode, {
      width: 128,
      height: 128,
      colorDark : '#000000',
      colorLight : '#ffffff',
      correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.clear();
    qrcode.makeCode(textToEncode);
  }

  //Slides logic
  vm.sliderOptions = {
    speed: 350,
  };

  $scope.$on('$ionicSlides.sliderInitialized', function (event, data) {
    // data.slider is the instance of Swiper
    vm.sliderItem = data.slider;
    $log.info('Slider initialized at ' + vm.sliderItem.activeIndex);
  });

  $scope.$on('$ionicSlides.slideChangeStart', function (event, data) {
    $log.info('Slide change is beginning, from ' + vm.sliderItem.previousIndex + ' to ' + vm.sliderItem.activeIndex);
    if(vm.sliderItem.previousIndex === 1){ /*slideOutOfList();*/ }
  });

  $scope.$on('$ionicSlides.slideChangeEnd', function (event, data) {
    $log.info('Slide change ended, from ' + vm.sliderItem.previousIndex + ' to ' + vm.sliderItem.activeIndex);
  });

}