angular.module('starter.services')
.service('PopupService', popupService);

popupService.$inject = ['$ionicPopup'];
function popupService($ionicPopup) {

  return {
    getPasswordPopup: _getPasswordPopup,
    getAlertPopup: _getAlertPopup
  };

  function _getPasswordPopup(scope,passwordNgModel,title,sentence) {
    var popup = $ionicPopup.show({
      template: '<input type="password" ng-model="'.concat(passwordNgModel,'">'),
      title: title,
      subTitle: sentence,
      scope: scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Join</b>',
          type: 'button-positive',
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

}