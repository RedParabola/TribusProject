angular.module('starter.services')
  .factory('RoomResource', roomResource)
  .constant('ROOM_CONSTANTS', {
    GETALLROOMS: 'all',
    ROOMINFO_BYID: 'info',
    CHECK_ROOMCODE: 'check',
    VOTEHISTORY_BYID: 'votes',
    CREATEROOM: 'create'
  })

  roomResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function roomResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.ROOM_URL).withHttpConfig({timeout: 1000});
}