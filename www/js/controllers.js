angular.module('crypto.controllers', ['ionic', 'crypto.services'])

  .controller('HomeCtrl', ['$scope', homeController])
  .controller('GeneratePasswordCtrl', ['$scope', '$rootScope', 'DBService',generatePasswordController])
  .controller('AddPlatformCtrl', ['$scope', '$ionicPopup', '$state','$rootScope', 'DBService', addPlatformController]);

function homeController($scope) {

}

function generatePasswordController($scope, $rootScope, DBService) {
  $scope.allPlatforms = [];
  $scope.selectedPlatform;
  $scope.customSeed = false;

  DBService.getAllPlatforms().then(function(allPlatforms){
    $scope.allPlatforms = allPlatforms;
    $scope.selectedPlatform = $scope.allPlatforms[0];
  });

  $scope.passwordConfig = {
    name: String(),
    length : 8,
    acceptedCharacters: {
      lowercase: Boolean(),
      uppercase: Boolean(),
      digit: Boolean(),
      symbol: Boolean()
    },
    cipheredSeed: String(),
    cipherKey: String(),
    ciphers: String[3],
    seed: 'Hello!',
    availableCharacters: String()
  };

  $scope.generatePassword = function(){
    var password = {
      platform: $scope.selectedPlatform,
      name: $scope.passwordConfig.name,
      acceptedCharacters: $scope.passwordConfig.acceptedCharacters,
      cipheredSeed: $scope.passwordConfig.cipheredSeed,
      cipherKey:$scope.passwordConfig.cipherKey,
      ciphers: $scope.passwordConfig.ciphers
    }
  };

  $scope.useCustomSeed = function(custom){
    if(custom){
      $scope.customSeed=true;
    }else{
      $scope.customSeed=false;
      $scope.generateSeed();
    }
  };

  $scope.generateSeed = function(){
    if($scope.selectedPlatform==undefined){
      alertPopup('No platform detected', 'Select one platform before continue please')
    }else{
      var length =$scope.passwordConfig.length;
      loadAvailableCharacters();
      console.log('Available characters: '+$scope.passwordConfig.availableCharacters);
      var seed = String();
      for(var i=0; i<length; i++){

        var randomIndex = Math.floor(Math.random()*($scope.passwordConfig.availableCharacters.length-1));
        seed+= $scope.passwordConfig.availableCharacters[randomIndex];
      }
      console.log('Seed: '+seed);
      $scope.passwordConfig.seed=seed;
    }
  };

  function loadAvailableCharacters(){
    if($scope.passwordConfig.acceptedCharacters.lowercase){
      $scope.passwordConfig.availableCharacters += $rootScope.LOWERCASE;
    }
    if($scope.passwordConfig.acceptedCharacters.uppercase){
      $scope.passwordConfig.availableCharacters += $rootScope.UPPERCASE;
    }
    if ($scope.passwordConfig.acceptedCharacters.digit) {
      $scope.passwordConfig.availableCharacters += $rootScope.DIGIT;
    }
    if ($scope.passwordConfig.acceptedCharacters.symbol) {
      $scope.passwordConfig.availableCharacters += $rootScope.SYMBOL;
    }
  }

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
        $ionicPopup.show(platformSavedPopup());
      } else {
        $ionicPopup.alert(alertPopup('Save Platform', 'Unable to add Platform'));
      }
    } else {
      $ionicPopup.alert(alertPopup('Save Platform', 'Platform not valid'));
    }
  };
}

function platformSavedPopup(){
  return {
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
  };
}

function alertPopup(title, text){
  return {
    title: title,
    template: '<p class="assertive">' + text + '</p>'
  };
}


