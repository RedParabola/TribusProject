// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', [
  'ionic',
  'ngCordova',
  'ngAnimate',
  'starter.controllers',
  'starter.services',
  'starter.components',
  'starter.layouts',
  'chart.js',
  //'flux',
  //'edomus.stores',
  //'edomus.stores.things',
  'restangular'
  ])
  
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'app/modules/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'app/modules/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'registerCtrl'
    })

    .state('tos', {
      url: '/tos',
      templateUrl: 'app/modules/tos/tos.html',
      controller: 'TosController',
      controllerAs: 'tosCtrl'
    })

    .state('hall', {
      url: '/hall',
      templateUrl: 'app/modules/hall/hall.html',
      controller: 'HallController',
      controllerAs: 'hallCtrl'
    })

    .state('hall.profile', {
      url: '/hall-profile',
      templateUrl: 'app/modules/profile/hall-profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl'
    })

    .state('room-creation-wizard', {
      url: '/room-creation-wizard',
      templateUrl: 'app/modules/room-creation-wizard/room-creation-wizard.html',
      controller: 'RoomCreationWizardController',
      controllerAs: 'roomCreationWizardCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('moderator', {
      url: '/moderator',
      abstract: true,
      templateUrl: 'app/modules/main/moderator-tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('moderator.overview', {
      url: '/overview/:roomId',
      views: {
        'tab-overview': {
          templateUrl: 'app/modules/overview/overview.html',
          controller: 'OverviewController',
          controllerAs: 'overviewCtrl'
        }
      }
    })

    .state('moderator.timers', {
      url: '/timers/:roomId',
      views: {
        'tab-timers': {
          templateUrl: 'app/modules/timers/timers.html',
          controller: 'TimersController',
          controllerAs: 'timersCtrl'
        }
      }
    })

    .state('moderator.questions-manager', {
      url: '/questions-manager/:roomId',
      views: {
        'tab-questions-manager': {
          templateUrl: 'app/modules/questions/questions-manager.html',
          controller: 'QuestionsController',
          controllerAs: 'questionsCtrl'
        }
      }
    })

    .state('spectator', {
      url: '/spectator',
      abstract: true,
      templateUrl: 'app/modules/main/spectator-tabs.html'
    })

    .state('spectator.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'app/modules/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: 'profileCtrl'
        }
      }
    })

    .state('spectator.dash', {
      url: '/dash/:roomId',
      views: {
        'tab-dash': {
          templateUrl: 'app/modules/dashboard/dash.html',
          controller: 'DashController',
          controllerAs: 'dashCtrl'
        }
      }
    })

    .state('spectator.questions', {
      url: '/questions/:roomId',
      views: {
        'tab-questions': {
          templateUrl: 'app/modules/questions/questions.html',
          controller: 'QuestionsController',
          controllerAs: 'questionsCtrl'
        }
      }
    })
    
    .state('test-state', {
      url: '/test-state',
      templateUrl: 'app/modules/test-state/test-state.html',
      controller: 'TestStateController',
      controllerAs: 'testStateCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

  })