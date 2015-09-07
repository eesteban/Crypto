angular.module('crypto.controllers', ['ionic', 'crypto.services'])


  .controller('HomeCtrl', ['$scope', homeController])
  .controller('GeneratePasswordCtrl', ['$scope', 'DBService',generatePasswordController])
  .controller('AddPlatformCtrl', ['$scope', '$ionicPopup', '$state','$rootScope', 'DBService', addPlatformController]);

function homeController($scope) {

}

function generatePasswordController($scope, DBService) {
  $scope.allPlatforms = [];
  //$scope.allPlatforms = [{name:'Endika', color: 'positive'}, {name:'Roger', color: 'positive'}];
  console.log(JSON.stringify($scope.allPlatforms));
  $scope.selectedPlatform = null;
  $scope.password = {
    acceptedCharacters: {
      lowercase: Boolean(),
      uppercase: Boolean(),
      digit: Boolean(),
      symbol: Boolean()
    },
    length: 8,
    seed: String(),
    key: String(),
    ciphers: String[3]
  }

  DBService.getAllPlatforms().then(function(allPlatforms){
    $scope.allPlatforms = allPlatforms;
    $scope.selectedPlatform = $scope.allPlatforms[0];
    $scope.password.acceptedCharacters.lowercase = $scope.selectedPlatform.acceptedCharacters.lowercase;
    $scope.password.acceptedCharacters.uppercase = $scope.selectedPlatform.acceptedCharacters.uppercase;
    $scope.password.acceptedCharacters.digit = $scope.selectedPlatform.acceptedCharacters.digit;
    $scope.password.acceptedCharacters.symbol = $scope.selectedPlatform.acceptedCharacters.symbol;

  });
}

function addPlatformController($scope, $ionicPopup, $state, $rootScope, DBService) {
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

  $scope.COLORS = $rootScope.COLORS;

  $scope.savePlatform = function () {
    if ($scope.newPlatform.name != '' && 6 <= $scope.newPlatform.minimumLength <= 20) {
      if (DBService.addPlatform($scope.newPlatform)) {
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
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Save Platform',
          template: '<p class="assertive">Unable to add Platform</p>'
        });
      }

    } else {
      var alertPopup = $ionicPopup.alert({
        title: 'Save Platform',
        template: '<p class="assertive">Platform not valid</p>'
      });
    }
  };
};

