// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('crypto', ['ionic', 'crypto.controllers'])

  .run(function ($ionicPlatform, $rootScope, DBAdminService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        DBAdminService.initDB();

        $rootScope.COLORS = [
          {'color': 'light'},
          {'color': 'stable'},
          {'color': 'positive'},
          {'color': 'calm'},
          {'color': 'balanced'},
          {'color': 'energized'},
          {'color': 'assertive'},
          {'color': 'royal'},
          {'color': 'dark'}
        ];

        $rootScope.LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
        $rootScope.UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $rootScope.DIGIT = '1234567890';
        $rootScope.SYMBOL = '#%&()*+-¿?@[]_';
      }
    );
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('passwords', {
      url: '/',
      templateUrl: 'templates/passwords.html',
      controller: 'PasswordCtrl'
    });

    $stateProvider.state('newPassword', {
      url: '/newPassword',
      templateUrl: 'templates/newPassword.html',
      controller: 'NewPasswordCtrl'
    });

    $stateProvider.state('addPlatform', {
      url: '/addPlatform',
      templateUrl: 'templates/addPlatform.html',
      controller: 'AddPlatformCtrl'
    });

    $urlRouterProvider.otherwise('/');

  });


