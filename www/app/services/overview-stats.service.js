angular.module('starter.services')
  .service('OverviewStatsService', overviewStatsService);

  overviewStatsService.$inject = [];
  function overviewStatsService() {

    var linkedRooms;
    
    mockInitialize();

    return {
      getLinkedRooms: _getLinkedRooms
    };

    function _getGlobalStats() {
      return stats;
    }

    function _getLinkedRooms() {
      return linkedRooms;
    }

    // Some fake testing data
    function mockInitialize(){
      linkedRooms = [
        {
          master: 'Pepe',
          accepted: '--',
          invited: '--',
          topic: 'Topic 1',
          status: 'COMING_SOON',
        },
        {
          master: 'Cesar',
          accepted: 20,
          invited: 70,
          topic: 'Topic 1',
          status: 'OPEN',
        },
        {
          master: 'Pepe',
          accepted: 60,
          invited: 105,
          topic: 'Topic 2',
          status: 'IN_PROGRESS',
        },
        {
          master: 'Julio',
          accepted: 45,
          invited: 59,
          topic: 'Topic 3',
          status: 'CLOSED',
        }
      ]
    }

}