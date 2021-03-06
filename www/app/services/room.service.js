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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        ],
        phases: [
          {
            id: 0,
            phase: 'OPENING',
            duration: 5,
          },
          {
            id: 1,
            phase: 'DEBATING',
            duration: 10,
          },
          {
            id: 2,
            phase: 'VOTING',
            duration: 2,
          },
          {
            id: 0,
            phase: 'CLOSURE',
            duration: 5,
          },
          {
            id: 0,
            phase: 'QUESTIONS',
            duration: 5,
          }
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
        status: 'OPENING',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
        status: 'CLOSURE',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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
        description: 'A slight description of the topic, set by the moderator when creating the room.',
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


    
    var roomInfo=      {
      id: 01234,
      master: 'Pepe',
      private: false,
      accepted: 60,
      invited: 105,
      category: 'ECONOMICS',
      topic: 'Consequences of globalization on underdeveloped countries',
      description: 'A slight description of the topic, set by the moderator when creating the room.',
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