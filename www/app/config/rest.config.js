angular.module('starter.services', [])
  .constant('SERVER_END_POINT_CONSTANTS', {
    BASE_URL: 'http://mund0.top:3000',//Raspi nodejs server from outside
  })
  .constant('SERVER_API_REST_CONSTANTS', {
    TVSHOWS_URL: '/api/tvshows',
    ROOM_URL: '/api/room',
  })
  .factory('ServerResource', serverResource);

  serverResource.$inject = ['Restangular', '$log', 'SERVER_END_POINT_CONSTANTS'];
  function serverResource(Restangular, $log, SERVER_END_POINT_CONSTANTS) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(SERVER_END_POINT_CONSTANTS.BASE_URL);
      RestangularConfigurer.setDefaultHeaders(angular.extend(RestangularConfigurer.defaultHeaders, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-type': 'application/json; charset=utf-8',
        'content-type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.8'
      }));
    });
  }