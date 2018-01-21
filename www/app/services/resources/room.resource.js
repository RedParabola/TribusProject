angular.module('starter.services')
  .factory('RoomResource', roomResource)
  .constant('ROOM_ENDP', {
    GETALLROOMS: 'all',
    ROOMINFO_BYID: 'info',
    CHECK_ROOMCODE: 'check',
    VOTEHISTORY_BYID: 'votes',
    CREATEROOM: 'create'
  })
  .constant('CategoryConstants', {
    CULTURE: {
      text: 'Culture',
      icon: 'ion-android-color-palette'
    },
    ECONOMICS: {
      text: 'Economics',
      icon: 'ion-cash'
    },
    EDUCATION: {
      text: 'Education',
      icon: 'ion-university'
    },
    ENVIRONMENT: {
      text: 'Environment',
      icon: 'ion-earth'
    },
    HEALTH: {
      text: 'Health',
      icon: 'ion-ios-heart'
    },
    HISTORY: {
      text: 'History',
      icon: 'ion-ios-world'
    },
    HUMANRIGHTS: {
      text: 'Human Rights',
      icon: 'ion-android-hand'
    },
    LIFESTYLE: {
      text: 'Life Style',
      icon: 'ion-paper-airplane'
    },  
    MORAL: {
      text: 'Moral',
      icon: 'ion-ios-body-outline'
    },
    POLITICS: {
      text: 'Politics',
      icon: 'ion-ios-pie'
    },
    PSYCHOLOGY: {
      text: 'Psychology',
      icon: 'ion-android-contacts'
    },
    SCIENCE: {
      text: 'Science',
      icon: 'ion-ionic'
    },
    SOCIETY: {
      text: 'Society',
      icon: 'ion-ios-people'
    },
    SPORTS: {
      text: 'Sports',
      icon: 'ion-ios-football'
    },
    TECHNOLOGY: {
      text: 'Technology',
      icon: 'ion-power'
    },
    WORK: {
      text: 'Work',
      icon: 'ion-ios-briefcase'
    },
    OTHERS: {
      text: 'Others',
      icon: 'ion-cube'
    }
  })
  .constant('RoomStatusConstants', {
    NOT_STARTED: {
      text: 'Not Started',
      textColor: 'clear',
      roomPhase: 'pre',
    },
    PRESENTATION: {
      text: 'Presentation',
      textColor: 'clear',
      roomPhase: 'progress',
    },
    PREDICTION: {
      text: 'Prediction',
      textColor: 'clear',
      roomPhase: 'progress',
    },
    DEBATING: {
      text: 'Debating',
      textColor: 'clear',
      roomPhase: 'progress',
    },
    VOTING: {
      text: 'Voting',
      textColor: 'clear',
      roomPhase: 'progress',
    },
    PAUSE: {
      text: 'Pause',
      textColor: 'clear',
      roomPhase: 'progress',
    },
    LAST_WORDS: {
      text: 'Last words',
      textColor: 'dark',
      roomPhase: 'ending',
    },
    QUESTIONS: {
      text: 'Questions',
      textColor: 'dark',
      roomPhase: 'ending',
    } ,   
    FINAL_STATS: {
      text: 'Final stats',
      textColor: 'dark',
      roomPhase: 'ending',
    },
    CLOSED: {
      text: 'Closed',
      textColor: 'dark',
      roomPhase: 'closed',
    }
  });

roomResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function roomResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.ROOM_URL).withHttpConfig({timeout: 1000});
}