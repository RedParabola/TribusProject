angular.module('starter.services')
.service('LoginService', loginService);

loginService.$inject = ['$rootScope', '$q', 'ShowResource'];
function loginService($rootScope, $q, ShowResource) {

  return {
    tryLogin: _tryLogin,
  };

  function _tryLogin(userEmail,userPassword) {
    var deferred = $q.defer();
    var tempCredentials = {email: userEmail,password: userPassword};
    if ((tempCredentials.email === 'user@email.com' && tempCredentials.password === 'secret') ||
        (tempCredentials.email === '0' && tempCredentials.password === '0')) {
      deferred.resolve({
        email: userEmail,
        field1: 'Campo 1',
        field2: 'Campo 2'
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  }

}

