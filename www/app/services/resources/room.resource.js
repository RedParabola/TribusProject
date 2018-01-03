angular.module('starter.services')
  .factory('RoomResource', roomResource)
  .constant('ROOM_ENDP', {
    GETALLROOMS: 'all',
    ROOMINFO_BYID: 'info',
    CHECK_ROOMCODE: 'check',
    VOTEHISTORY_BYID: 'votes',
    CREATEROOM: 'create'
  })
  .constant('CategoryConstants', [
    {name: 'POLITICS', icon: 'pol-icon'},
    {name: 'SPORTS', icon: 'pol-icon'},
    {name: 'SOCIETY', icon: 'pol-icon'},
    {name: 'TECHNOLOGY', icon: 'pol-icon'},
    {name: 'PSYCHOLOGY', icon: 'pol-icon'},
    {name: 'INTERNATIONAL', icon: 'pol-icon'}
  ]);

  roomResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function roomResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.ROOM_URL).withHttpConfig({timeout: 1000});
}