angular.module('starter.services')
.service('PopupService', popupService);

popupService.$inject = ['$ionicPopup'];
function popupService($ionicPopup) {

  return {
    getAddActorPopup: _getAddActorPopup,
    getAddPhasePopup: _getAddPhasePopup,
    getPasswordPopup: _getPasswordPopup,
    getConfirmPopup: _getConfirmPopup,
    getAlertPopup: _getAlertPopup
  };

  function _getAddActorPopup(scope,actorNgModel,mottoNgModel,title,sentence) {
    var popup = $ionicPopup.show({
      template: '<label class="item item-input"><input type="text" placeholder="Actor\'s name" ng-model="'.concat(actorNgModel,'"></label><label class="item item-input"><textarea rows="3" type="text" placeholder="Actor\'s motto" ng-model="',mottoNgModel,'"></textarea></label>'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e){ return false; }
        },
        {
          text: '<b>Add actor</b>',
          type: 'button-positive',
          onTap: function(e){ return scope.$eval(actorNgModel); }
        }
      ]
    });
    return popup;
  }

  function _getAddPhasePopup(scope,timeNgModel,title,sentence) {
    var popup = $ionicPopup.show({
      template: '<label class="item item-input"><input type="number" placeholder="Time in minutes" ng-model="'.concat(timeNgModel,'"></label>'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e){ return false; }
        },
        {
          text: '<b>Add phase</b>',
          type: 'button-positive',
          onTap: function(e){ return scope.$eval(timeNgModel); }
        }
      ]
    });
    return popup;
  }

  function _getPasswordPopup(scope,passwordNgModel,title,sentence) {
    var popup = $ionicPopup.show({
      template: '<input type="password" ng-model="'.concat(passwordNgModel,'">'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: [
        {
          text: 'Cancel',
          onTap: function(e){ return false; }
        },
        {
          text: '<b>Join</b>',
          type: 'button-positive',
          onTap: function(e){ return true; }          
        }
      ]
    });
    return popup;
  }

  function _getAlertPopup(title,sentence){
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: sentence
    });
    return alertPopup;
  }

  function _getConfirmPopup(title,sentence,customCancel,customOk){
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: sentence,
      cancelText: customCancel,
      okText: customOk
    });
    return confirmPopup;
  }

}