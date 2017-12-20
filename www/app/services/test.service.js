angular.module('starter.services')
  .service('TestService', testService);

  testService.$inject = ['$q', 'ShowResource', 'SHOWS_CONSTANTS'];
  function testService($q, ShowResource, SHOWS_CONSTANTS) {

    return {
      getAllTVShows: _getAllTVShows,
      getTVShowById: _getTVShowById,
      removeTVShow: _removeTVShow
    };

    function _getAllTVShows() {
      var deferred = $q.defer();
      ShowResource.customGETLIST(SHOWS_CONSTANTS.ALLSHOWS).then(
        function (data) {
          var responsePlain = data.plain();
          deferred.resolve(parseTestResponse(responsePlain));
        },
        function (error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }

    function _removeTVShow(showId) {
    }

    function _getTVShowById(showId) {

      return show;
    }


    function parseTestResponse(response){   
      var parsedResponse = response;
      return parsedResponse;
    }

}