angular.module('crypto.controllers', ['ionic', 'crypto.services'])

  .controller('HomeCtrl', function ($scope) {

  })

  .controller('GeneratePasswordCtrl', function ($scope) {
    $scope.platforms = []; /*Get all platforms*/
    $scope.selectedPlatform = $scope.platforms[0];
    $scope.password = {
      acceptedCharacters: {
        lowercase: Boolean(),
        uppercase: Boolean(),
        digit: Boolean(),
        symbol: Boolean()
      },
      length: Number(),
      seed: String(),
      key: String(),
      ciphers: String[3]
    }
  })

  .controller('AddPlatformCtrl', function ($scope, $ionicPopup, $state) {
    $scope.newPlatform = {
      name: String(),
      minimumLength: 8,
      acceptedCharacters: {
        lowercase: Boolean(),
        uppercase: Boolean(),
        digit: Boolean(),
        symbol: Boolean()
      },
      color: String()
    };

    $scope.COLORS = [
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

    $scope.savePlatform = function () {

      var validModel = function () {
        return ($scope.newPlatform.name != '' && 6 <= $scope.newPlatform.minimumLength <= 20);
      };

      if (validModel()) {
        // Try save and then pupup
        /*
        if (Data correctly saved)) {
          var successPopup = $ionicPopup.show({
            template: '<p class="balanced">Platform correctly saved</p>',
            title: 'Save Platform',
            scope: $scope,
            buttons: [
              {
                text: 'Home',
                type: 'button-dark',
                onTap: function () {
                  $state.go('home')
                }
              },
              {
                text: 'Generate Password',
                type: 'button-positive',
                onTap: function () {
                  $state.go('generatePassword')
                }
              }
            ]
          });
        }else {
          var alertPopup = $ionicPopup.alert({
            title: 'Save Platform',
            template: '<p class="assertive">Unable to add Platform</p>'
          });
        }*/

      } else {
        /*var alertPopup = $ionicPopup.alert({
          title: 'Save Platform',
          template: '<p class="assertive">Platform not valid</p>'
        });*/
        var alertPopup = new $ionicPopup({
          title: 'Save Platform',
          template: '<p class="assertive">Platform not valid</p>'
        });
        alertPopup.alert();
      }
    };


  });

