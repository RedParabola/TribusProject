angular.module('starter.services')
.service('RoomService', roomService);

roomService.$inject = ['$q', 'RoomResource', 'ROOM_ENDP'];
function roomService($q, RoomResource, ROOM_ENDP) {

  return {
    getExistentRooms: _getExistentRooms,
    getRoomInfo: _getRoomInfo,
    getRoomStats: _getRoomStats,
    checkRoomCode: _checkRoomCode,
  };

  function _getExistentRooms(){
    var deferred = $q.defer();
    getFakeList().then(
    //RoomResource.customGET(ROOM_ENDP.GETALLROOMS,{}).then(
      function (data) {
        deferred.resolve(parseTestResponse(data));
      },
      function (error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  function _getRoomInfo(roomId) {
    var deferred = $q.defer();
    getFakeInfo().then(
    //RoomResource.customGET(ROOM_ENDP.ROOMINFO_BYID,{roomId: roomId}).then(
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
    //RoomResource.customGET(ROOM_ENDP.VOTEHISTORY_BYID,{roomId: roomId}).then(
      function (data) {
        deferred.resolve(parseTestResponse(data));
      },
      function (error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  function _checkRoomCode(roomId,roomCode) {
    var deferred = $q.defer();
    checkCodeFake(roomId,roomCode).then(
    //RoomResource.customGET(ROOM_ENDP.CHECK_ROOMCODE,{roomId: roomId, roomCode: roomCode}).then(
      function (data) {
        deferred.resolve(parseTestResponse(data));
      },
      function (error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  //Maximum size for topic: 42 characters
  function getFakeList () {
    var deferred = $q.defer();
    var roomsArray= [
      {
        id: 01234,
        master: 'Pepe',
        private: false,
        accepted: 60,
        invited: 105,
        category: 'ECONOMICS',
        topic: 'Consequences of globalization on underdeveloped countries',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'NOT_STARTED',
        joined: 50,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 12345,
        master: 'Carlos',
        private: false,
        accepted: 60,
        invited: 105,
        category: 'MORAL',
        topic: 'Facebook friendships',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'PRESENTATION',
        joined: 49,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 23456,
        master: 'Lidia',
        private: false,
        accepted: 60,
        invited: 105,
        category: 'CULTURE',
        topic: 'Male or female stereotypes in popular culture',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'PREDICTION',
        joined: 73,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 34567,
        master: 'Virginia',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'PSYCHOLOGY',
        topic: 'Are adults merely obsolete children?',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'DEBATING',
        joined: 68,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 45678,
        master: 'Sergio',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'LIFESTYLE',
        topic: 'What effect does social media have on interpersonal relationships?',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'VOTING',
        joined: 66,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 56789,
        master: 'Diego',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'HEALTH',
        topic: 'Genetically modified foods',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'PAUSE',
        joined: 33,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 67890,
        master: 'Juan',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'TECHNOLOGY',
        topic: 'Virtual reality as a world in our world',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'LAST_WORDS',
        joined: 70,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 78901,
        master: 'Yu',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'EDUCATION',
        topic: 'What causes people to drop out of high school?',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'QUESTIONS',
        joined: 63,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 89012,
        master: 'Fran',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'SOCIETY',
        topic: 'Cyber bullying',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'CONCLUSIONS',
        joined: 39,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 90123,
        master: 'Horseman',
        private: true,
        accepted: 60,
        invited: 105,
        category: 'ENVIRONMENT',
        topic: 'Is horse-mankind a threat?',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'CLOSED',
        joined: 55,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      },
      {
        id: 66666,
        master: 'Loler',
        private: true,
        accepted: 666,
        invited: 666,
        category: 'OTHERS',
        topic: 'Is there anything more important than survival?',
        description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
        status: 'CLOSED',
        joined: 55,
        actors: [
          {
            name:'SGAE',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NSA',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'NETFLIX',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'The Pirate Bay',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'Users',
            motto: 'Brief sentence about the actor.'
          },
          {
            name:'CANAL+',
            motto: 'Brief sentence about the actor.'
          },
        ]
      }
    ];
    deferred.resolve(roomsArray);
    return deferred.promise;
  }

  function getFakeInfo () {
    var deferred = $q.defer();
    var roomInfo= {
      id: 12345,
      master: 'Pepe',
      private: true,
      accepted: 60,
      invited: 105,
      category: 'SOCIETY',
      topic: 'Is piracy a solution?',
      description: 'Here could be shown a small sum up of the topic. Find more useful information inside the debate.',
      status: 'DEBATING',
      joined: 45,
      actors: [
        {
          name:'SGAE',
          motto: 'Brief sentence about the actor.'
        },
        {
          name:'NSA',
          motto: 'Brief sentence about the actor.'
        },
        {
          name:'NETFLIX',
          motto: 'Brief sentence about the actor.'
        },
        {
          name:'The Pirate Bay',
          motto: 'Brief sentence about the actor.'
        },
        {
          name:'Users',
          motto: 'Brief sentence about the actor.'
        },
        {
          name:'CANAL+',
          motto: 'Brief sentence about the actor.'
        },
      ]
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

  function checkCodeFake(roomId,roomCode){
    var deferred = $q.defer();
    if(roomCode === 'qwe'){
      deferred.resolve();
    } else {
      deferred.reject();
    }
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