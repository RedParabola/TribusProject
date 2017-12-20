angular.module('starter.services')
  .factory('ShowResource', showResource)
  .constant('SHOWS_CONSTANTS', {
    ALLSHOWS: 'all',
    INSERTSHOW: 'insert',
    SHOWBYID: 'byid'
  })

  showResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function showResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.TVSHOWS_URL).withHttpConfig({timeout: 1000});
}