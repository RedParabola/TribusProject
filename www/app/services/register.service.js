angular.module('starter.services')
.service('RegisterService', registerService);

registerService.$inject = ['$rootScope', '$q', 'ShowResource'];
function registerService($rootScope, $q, ShowResource) {

  return {
    tryRegister: _tryRegister,
  };

  function _tryRegister(userName,userPassword) {
    var deferred = $q.defer();
    if (userName == 'user@lol.com' && userPassword == 'secret') {
      deferred.resolve({
        email: userName,
        field1: 'A',
        field2: 'B'
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  }

}

