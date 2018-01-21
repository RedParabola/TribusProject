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
      needsTextColor: 'dark',
      roomPhase: 'pre',
      icon: 'ion-load-a'
    },
    PRESENTATION: {
      text: 'Presentation',
      needsTextColor: 'dark',
      roomPhase: 'progress',
      icon: 'ion-easel'
    },
    PREDICTION: {
      text: 'Prediction',
      needsTextColor: 'dark',
      roomPhase: 'progress',
      icon: 'ion-podium'
    },
    DEBATING: {
      text: 'Debating',
      needsTextColor: 'dark',
      roomPhase: 'progress',
      icon: 'ion-chatboxes'
    },
    VOTING: {
      text: 'Voting',
      needsTextColor: 'dark',
      roomPhase: 'progress',
      icon: 'ion-pie-graph'
    },
    PAUSE: {
      text: 'Pause',
      needsTextColor: 'dark',
      roomPhase: 'progress',
      icon: 'ion-ios-pause'
    },
    LAST_WORDS: {
      text: 'Last words',
      needsTextColor: 'clear',
      roomPhase: 'ending',
      icon: 'ion-chatbox'
    },
    QUESTIONS: {
      text: 'Questions',
      needsTextColor: 'clear',
      roomPhase: 'ending',
      icon: 'ion-ios-help'
    } ,   
    CONCLUSIONS: {
      text: 'Conclusions',
      needsTextColor: 'clear',
      roomPhase: 'ending',
      icon: 'ion-ios-list-outline'
    },
    CLOSED: {
      text: 'Closed',
      needsTextColor: 'clear',
      roomPhase: 'closed',
      icon: 'ion-ios-checkmark'
    }
  });

roomResource.$inject = ['ServerResource', 'SERVER_API_REST_CONSTANTS'];
function roomResource(ServerResource, SERVER_API_REST_CONSTANTS) {
  return ServerResource.all(SERVER_API_REST_CONSTANTS.ROOM_URL).withHttpConfig({timeout: 1000});
}