angular.module('starter.services')
.service('UserService', userService);

userService.$inject = ['$rootScope', '$q', 'ShowResource'];
function userService($rootScope, $q, ShowResource) {

  return {
    tryLogin: _tryLogin,
    tryRegister: _tryRegister    
  };

  function _tryLogin(userEmail,userPassword) {
    var deferred = $q.defer();
    var tempCredentials = {email: userEmail,password: userPassword};
    if ((tempCredentials.email === 'user@email.com' && tempCredentials.password === 'secret') ||
        (tempCredentials.email === 'eusta@quorum.com' && tempCredentials.password === '123') ||
        (tempCredentials.email === 'gildo@quorum.com' && tempCredentials.password === '123') ||
        (tempCredentials.email === '0' && tempCredentials.password === '0')) {
      deferred.resolve({
        email: userEmail,
        isUserAnonymous: true,
        isUserModerator: undefined
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  }

  function _tryRegister(userName,userPassword) {
    var deferred = $q.defer();
    $rootScope.mockUser = {
      email: userName,
      field1: 'A',
      field2: 'B'
    };
    deferred.resolve();
    return deferred.promise;
  }

}