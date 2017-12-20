angular.module('starter.services')
.service('RoomService', roomService);

roomService.$inject = ['$q', 'RoomResource', 'ROOM_CONSTANTS'];
function roomService($q, RoomResource, ROOM_CONSTANTS) {

  return {
    getRoomInfo: _getRoomInfo,
    getRoomStats: _getRoomStats,
  };

  function _getRoomInfo(roomId) {
    var deferred = $q.defer();
    getFakeInfo().then(
    //RoomResource.customGET(ROOM_CONSTANTS.ROOMINFO_BYID,{roomId: roomId}).then(
      function (data) {
        deferred.resolve(parseTestResponse(data));
      },
      function (error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  function _getRoomStats(roomId) {
    var deferred = $q.defer();
    getFakeStats().then(
    //RoomResource.customGET(ROOM_CONSTANTS.VOTEHISTORY_BYID,{roomId: roomId}).then(
      function (data) {
        deferred.resolve(parseTestResponse(data));
      },
      function (error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  function getFakeInfo () {
    var deferred = $q.defer();
    var roomInfo= {
      id: 12345,
      master: 'Pepe',
      accepted: 60,
      invited: 105,
      category: 'SOCIETY',
      topic: 'Is piracy a solution?',
      description: 'Here could be shown a small sum up of the topic. Soon you will be able to vote any option of any topic.',
      status: 'IN_PROGRESS',
      options: [
        {name:'SGAE'},
        {name:'NSA'},
        {name:'NETFLIX'},
        {name:'The Pirate Bay'},
        {name:'Users'},
        {name:'CANAL+'},
      ],
    };
    deferred.resolve(roomInfo);
    return deferred.promise;
  }

  function getFakeStats () {
    var deferred = $q.defer();
    var votesArray = [0,0,0,0,0,0];
    for (var i = 0; i < votesArray.length; i++) {
      votesArray[i] = Math.floor((Math.random() * 15) + 0);
    }
    deferred.resolve(votesArray);
    return deferred.promise;
  }

  function parseTestResponse (response) {
    var parsedResponse = response;
    return parsedResponse;
  }

}

/*
$http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  https://docs.angularjs.org/api/ng/service/$http
*/