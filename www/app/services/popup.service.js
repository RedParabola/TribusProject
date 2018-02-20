angular.module('starter.services')
.service('PopupService', popupService);

popupService.$inject = ['$ionicPopup'];
function popupService($ionicPopup) {

  return {
    getAddActorPopup: _getAddActorPopup,
    getPhasePopup: _getPhasePopup,
    getPasswordPopup: _getPasswordPopup,
    getConfirmPopup: _getConfirmPopup,
    getAlertPopup: _getAlertPopup,
    getQRPopup: _getQRPopup,
    getAddQuestionPopup: _getAddQuestionPopup,
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
          type: 'button-balanced',
          onTap: function(e){ return scope.$eval(actorNgModel); }
        }
      ]
    });
    return popup;
  }

  function _getPhasePopup(scope,timeNgModel,title,sentence,isEditing) {
    var buttons = [
      {
        text: 'Cancel',
        onTap: function(e){ return false; }
      }
    ];
    if(isEditing){
      buttons.push({
        text: 'Clear',
        type: 'button-assertive',
        onTap: function(e){ return 'REMOVE'; }
      });
      buttons.push({
        text: '<b>Edit</b>',
        type: 'button-balanced',
        onTap: function(e){ return scope.$eval(timeNgModel); }
      });
    } else {
      buttons.push({
        text: '<b>Add phase</b>',
        type: 'button-balanced',
        onTap: function(e){ return scope.$eval(timeNgModel); }
      });
    }
    var popup = $ionicPopup.show({
      template: '<label class="item item-input"><input type="number" placeholder="Time in minutes" ng-model="'.concat(timeNgModel,'"></label>'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: buttons
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
          type: 'button-balanced',
          onTap: function(e){ return true; }          
        }
      ]
    });
    return popup;
  }

  function _getAlertPopup(title,sentence){
    var popup = $ionicPopup.alert({
      title: title,
      template: sentence,
      buttons: [
        {
          text: 'OK',
          type: 'button-balanced',
        }
      ]
    });
    return popup;
  }

  function _getConfirmPopup(title,sentence,customCancel,customOk){
    var popup = $ionicPopup.confirm({
      title: title,
      template: sentence,
      cancelText: customCancel,
      okText: customOk
    });
    return popup;
  }

  function _getQRPopup(scope,title) {
    var popup = $ionicPopup.show({
      template: '<div id="bigqr" class="big-qrcode"></div>',
      title: title,
      cssClass: 'QRpopup',
      scope: scope,
      buttons: [
        {
          text: '<b>Close expanded view</b>',
          type: 'button-balanced',
        }
      ]
    });
    return popup;
  }

  function _getAddQuestionPopup(scope,questionNgModel,title,sentence) {
    var popup = $ionicPopup.show({
      template: '<label class="item item-input"><textarea rows="4" type="text" placeholder="Your question goes here" ng-model="'.concat(questionNgModel,'"></textarea></label>'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: [
        {
          text: 'Discard',
          onTap: function(e){ return false; }
        },
        {
          text: '<b>Add question</b>',
          type: 'button-balanced',
          onTap: function(e){ return true; }          
        }
      ]
    });
    return popup;
  }

}