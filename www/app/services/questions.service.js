angular.module('starter.services')
.service('QuestionsService', questionsService);

questionsService.$inject = ['$q'];
function questionsService($q) {

  return {
    getQuestions: _getQuestions
  };

  function _getQuestions(){
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

  //Maximum size for topic: 180 characters
  function getFakeList () {
    var deferred = $q.defer();
    var questionsArray = [
      { id: 0,
        content: 'The underdeveloped countries governments are promoting slavery labors. What is ZARA\'s position on this?',
        upVotes: 4,
        downVotes: 3,
        status: 'UNANSWERED',
        author: 'Florilda'
      },
      { id: 1,
        content: 'For ONU. ¿Are you favouring job quantity over quality?',
        upVotes: 1,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'Marcus'
      },
      { id: 2,
        content: 'What is China\'s government perspective on their workers health?',
        upVotes: 5,
        downVotes: 1,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 3,
        content: 'For ZARA. What are your efforts towards workers protection against risks?',
        upVotes: 3,
        downVotes: 2,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 4,
        content: 'For UNESCO. Are we losing culture diversity in favor of global markets?',
        upVotes: 9,
        downVotes: 8,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 5,
        content: 'ZARA, could you please disappear? Your presence in this debate is such bullshit.',
        upVotes: 6,
        downVotes: 3,
        status: 'UNANSWERED',
        author: 'Horseman',
      },
      { id: 6,
        content: 'For the Bangladesh embassador. Is your country already a mature market or an emerging market yet?',
        upVotes: 0,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 7,
        content: 'For everyone. Is any of you considering globalisation\'s impact on global warming?',
        upVotes: 3,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'GinTonic89',
      },
      { id: 8,
        content: 'Europe, what are your concerns on rising of refugee populations related to market slavery in underdeveloped countries?',
        upVotes: 3,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'anonymous',
      },
      { id: 8,
        content: 'ANYBODY WANTS SOME HAPPYNESS GOT TONS OF THEM YOU WANNA GET GLOBALLY HIGH?',
        upVotes: 1,
        downVotes: 0,
        status: 'UNANSWERED',
        author: 'anonymous',
      }
    ];

    deferred.resolve(questionsArray);
    return deferred.promise;
  }

  function parseTestResponse (response) {
    var parsedResponse = response;
    return parsedResponse;
  }

}