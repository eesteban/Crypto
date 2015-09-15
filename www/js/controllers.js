angular.module('crypto.controllers', ['ionic', 'crypto.services'])

  .controller('PasswordCtrl', ['$scope', passwordCtrl])
  .controller('NewPasswordCtrl', ['$scope', '$rootScope', 'DBAdminService',newPasswordController])
  .controller('AddCategoryCtrl', ['$scope', '$ionicPopup', '$state','$rootScope', 'DBAdminService', addCategoryController]);

function passwordCtrl($scope) {


}

function newPasswordController($scope, $rootScope, DBAdminService) {
  $scope.allCategories = [];
  $scope.selectedCategory;
  $scope.customSeed = false;

  DBAdminService.getAllCategories().then(function(allCategories){
    $scope.allCategories = allCategories;
    $scope.selectedCategory = $scope.allCategories[1];
  });

  $scope.passwordConfig = {
    name: String(),
    length : 8,
    acceptedCharacters: {
      lowercase: true,
      uppercase: true,
      digit: true,
      symbol: true
    },
    cipherKey: String(),
    ciphers: String[3],
    seed: String(),
    availableCharacters: String()
  };

  $scope.useCustomSeed = function(custom){
    if(custom){
      $scope.customSeed=true;
    }else{
      $scope.customSeed=false;
    }
  };

  $scope.generatePassword = function(){
    var password = {
      category: $scope.selectedCategory,
      name: $scope.passwordConfig.name,
      acceptedCharacters: $scope.passwordConfig.acceptedCharacters,
      cipherSeed: String(),
      cipherKey:$scope.passwordConfig.cipherKey,
      ciphers: $scope.passwordConfig.ciphers
    }
  };

  $scope.generateSeed = function(){
    console.log('Inside generate seed');
    if($scope.selectedCategory==undefined){
      alertPopup('No category detected', 'Select one category before continue please')
    }else{
      var length =$scope.passwordConfig.length;
      loadAvailableCharacters();
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
    $scope.passwordConfig.availableCharacters='';
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

function addCategoryController($scope, $ionicPopup, $state, $rootScope, DBAdminService) {
  $scope.newCategory = {
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
    if ($scope.newCategory.name != '' && 6 <= $scope.newCategory.minimumLength <= 20) {
      if (DBAdminService.addCategory($scope.newCategory)) {
        $ionicPopup.show(platformSavedPopup());
      } else {
        $ionicPopup.alert(alertPopup('Save Platform', 'Unable to add Platform'));
      }
    } else {
      $ionicPopup.alert(alertPopup('Save Platform', 'Platform not valid'));
    }
  };
}

function platformSavedPopup($scope, $state){
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


