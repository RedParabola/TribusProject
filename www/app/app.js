// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', [
  'ionic',
  'ngCordova',
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

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'app/modules/main/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.overview', {
      url: '/overview',
      views: {
        'tab-overview': {
          templateUrl: 'app/modules/overview/tab-overview.html',
          controller: 'OverviewController',
          controllerAs: 'overviewCtrl'
        }
      }
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'app/modules/dashboard/tab-dash.html',
          controller: 'DashController',
          controllerAs: 'dashCtrl'
        }
      }
    })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'app/modules/settings/tab-settings.html',
          controller: 'SettingsController',
          controllerAs: 'settingsCtrl'
        }
      }
    })

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

    .state('hall', {
      url: '/hall',
      templateUrl: 'app/modules/hall/hall.html',
      controller: 'HallController',
      controllerAs: 'hallCtrl'
    })

    .state('room-list', {
      url: '/room-list',
      templateUrl: 'app/modules/room-list/room-list.html',
      controller: 'RoomListController',
      controllerAs: 'roomListCtrl'
    })

    .state('room-creation-wizard', {
      url: '/room-creation-wizard',
      templateUrl: 'app/modules/room-creation-wizard/room-creation-wizard.html',
      controller: 'RoomCreationWizardController',
      controllerAs: 'roomCreationWizardCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  })