angular
.module('starter.controllers')
.controller('RoomCreationWizardController', roomCreationWizardController);

roomCreationWizardController.$inject = ['$rootScope', '$scope', '$log', '$state', '$ionicHistory', '$ionicLoading',
  '$ionicSlideBoxDelegate', 'CategoryConstants', 'RoomStatusConstants', 'PopupService', '$window'];
function roomCreationWizardController($rootScope, $scope, $log, $state, $ionicHistory, $ionicLoading,
  $ionicSlideBoxDelegate, CategoryConstants, RoomStatusConstants, PopupService, $window) {

  var vm = this;
  var moment = $window.moment;

  vm.updateSelectedCategory = _updateSelectedCategory;

  vm.addNewActor = _addNewActor;
  vm.editActor = _editActor;
  vm.removeActor = _removeActor;

  vm.resetPhases = _resetPhases;
  vm.addRepeatablePhase = _addRepeatablePhase;
  vm.toggleCheckbox = _toggleCheckbox;
  vm.tapPhase = _tapPhase;

  vm.makeCode = _makeCode;

  vm.goPrevSlide = _goPrevSlide;
  vm.goNextSlide = _goNextSlide;

  var textToEncode = 'OMG! Tits';
  
  initialize();

  //////////////////

  function initialize(){

    vm.categories = [];
    vm.totalDuration = 0;
    vm.totalHours = '00';
    vm.totalMinutes = '00';
    vm.debatePhases = [];
    vm.presentation = false;
    vm.prediction = false;
    vm.last_words = false;
    vm.questions = false;
    
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

  
  /*** 1. Basic info ***/
  /*-------------------*/
  
  function _updateSelectedCategory(){
    if(vm.selectedCategory){
      vm.globalColor = vm.selectedCategory.toLowerCase();
    }
  }


  /*** 2. List of actors ***/
  /*-----------------------*/

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


  /*** 3. Debate phases ***/
  /*----------------------*/

  function _resetPhases(){
    if(vm.debatePhases.length){
      var confirmPopup = PopupService.getConfirmPopup(
        'Are you sure?',
        'You will remove all the debate phases you already added.',
        'Cancel',
        'Reset'
      );
      confirmPopup.then(function(res){
        if(res){
          vm.debatePhases = [];
          vm.presentation = false;
          vm.prediction = false;
          vm.last_words = false;
          vm.questions = false;
        }
      });
    }
  }

  function _addRepeatablePhase(key){
    var id= _.max(_.map(vm.debatePhases,'id')) + 1 || 1;
    _toggleCheckbox(key,id);
  }

  function _toggleCheckbox(key, id){
    //if vm[key] then it's a toggle set at true and must add
    //if id, then it's not a toggle and must add anyway
    if(vm[key] || id){
      var howMany = _.filter(vm.debatePhases,function(phase){
        return key === phase.phase;
      }).length + 1;
      var phasePopup = PopupService.getPhasePopup(
        $scope,
        'roomCreationWizardCtrl.newPhaseTime',
        'Add ' + key + ' ' + (howMany > 1? howMany:'') +' phase',
        'How long will this phase take?',
        false
      );
      phasePopup.then(function(res){
        if (res){
          insertPhase(key,res,id || 0);
        } else {
          vm[key]=false;
        }
      });
    } else {
      vm.debatePhases = _.reject(vm.debatePhases, function(phase){
        return phase.phase === key;
      });
      recalculateTotalTime();
    }
  }

  function insertPhase(key, duration, id){
    var newPhase = {
      id: id,
      phase: key,
      duration: duration,
    };
    switch (key) {
      case 'presentation':
        vm.debatePhases.splice(0, 0, newPhase);
        break;
      case 'prediction':
        if (vm.presentation) {
          vm.debatePhases.splice(1, 0, newPhase);
        } else {
          vm.debatePhases.splice(0, 0, newPhase);
        }
        break;
      case 'last_words':
        if (vm.questions) {
          vm.debatePhases.splice(vm.debatePhases.length - 1, 0, newPhase);
        } else {
          vm.debatePhases.push(newPhase);
        }
        break;
      case 'questions':
        vm.debatePhases.push(newPhase);
        break;
      default:
        if(vm.last_words && vm.questions){
          vm.debatePhases.splice(vm.debatePhases.length - 2, 0, newPhase);
        } else if (vm.last_words || vm.questions) {
          vm.debatePhases.splice(vm.debatePhases.length - 1, 0, newPhase);
        } else {
          vm.debatePhases.push(newPhase);
        }
        break;
    }
    recalculateTotalTime();
  }

  function _tapPhase(phaseToEdit,index){
    //Firt count to number the body phases
    var howMany = _.filter(_.take(vm.debatePhases,index),function(phase){
      return phaseToEdit.phase === phase.phase;
    }).length;
    var phasePopup = PopupService.getPhasePopup(
      $scope,
      'roomCreationWizardCtrl.newPhaseTime',
      'Edit ' + phaseToEdit.phase + ' ' + (howMany + 1),
      'Set the desired duration for this phase or remove it.',
      true
    );
    phasePopup.then(function(res){
      if (res){
        editPhase(phaseToEdit,res);
      }
    });
  }

  function editPhase(phaseToEdit,value){
    if(value === 'REMOVE'){
      vm.debatePhases = _.without(vm.debatePhases,phaseToEdit);
      recalculateTotalTime();
      if(vm[phaseToEdit.phase]){
        vm[phaseToEdit.phase] = false;
      }
    } else {
      phaseToEdit.duration = value;
      recalculateTotalTime();
    }
  }

  function recalculateTotalTime(){
    var recalculatedDuration = 0;
    angular.forEach(vm.debatePhases,function(phase){
      recalculatedDuration = recalculatedDuration + phase.duration;
    });
    vm.totalDuration = moment.duration({'minutes': recalculatedDuration});
    vm.totalHours = moment.utc(recalculatedDuration*60*1000).format("HH");
    vm.totalMinutes = moment.utc(recalculatedDuration*60*1000).format("mm");
  }

  /*** 4. Overview ***/
  /*-----------------*/

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


  /*** Slides logic and events ***/
  /*-----------------------------*/

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

  function _goPrevSlide(){
    vm.sliderItem.slideTo(vm.sliderItem.activeIndex - 1);
  }

  function _goNextSlide(){
    vm.sliderItem.slideTo(vm.sliderItem.activeIndex + 1);
  }

}