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
    {name: 'Culture',       icon: 'ion-android-color-palette'},
    {name: 'Economics',     icon: 'ion-cash'},
    {name: 'Education',     icon: 'ion-university'},
    {name: 'Environment',   icon: 'ion-earth'},
    {name: 'Health',        icon: 'ion-ios-heart'},
    {name: 'History',       icon: 'ion-ios-world'},
    {name: 'Human Rights',  icon: 'ion-android-hand'},
    {name: 'Life Style',    icon: 'ion-paper-airplane'},    
    {name: 'Moral',         icon: 'ion-ios-body-outline'},
    {name: 'Politics',      icon: 'ion-ios-pie'},
    {name: 'Psychology',    icon: 'ion-android-contacts'},
    {name: 'Science',       icon: 'ion-ionic'},
    {name: 'Society',       icon: 'ion-ios-people'},
    {name: 'Sports',        icon: 'ion-ios-football'},
    {name: 'Technology',    icon: 'ion-power'},
    {name: 'Work',          icon: 'ion-ios-briefcase'}
  ]);

roomResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function roomResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.ROOM_URL).withHttpConfig({timeout: 1000});
}