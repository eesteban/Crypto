angular.module('crypto.services', [])

  .factory('DBAdminService', ['$cordovaSQLite', '$q', '$ionicPlatform', DBAdmin])

  .factory('DBService', ['DBAdminService', SQLDatabase]);

function DBAdmin($cordovaSQLite, $q, $ionicPlatform) {
  var db;
  return {
    initDB: initDB,
    query: query,
    getAll: getAll,
    getById: getById
  };

  //Init DB
  function initDB() {
    console.log('Initializing database...');
    try {
      if (window.cordova) {
        // App syntax
        db = $cordovaSQLite.openDB("crypto.db");
      } else {
        // Ionic serve syntax
        db = window.openDatabase("crypto.db", "1.0", "Crypto DB", -1);
      }

      /*$cordovaSQLite.execute(db, "DROP TABLE platforms");
       $cordovaSQLite.execute(db, "DROP TABLE passwords");*/

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS platforms (name TEXT PRIMARY KEY, minimumLength INTEGER, " +
        "lowercase INTEGER, uppercase INTEGER, digit INTEGER, symbol INTEGER, color TEXT)");
      console.log('Creating table: Platforms');

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY, name, seed, key, accChar, cipher0, cipher1, cipher2)");
      console.log('Creating table: Passwords');

      console.log('Database successfully initialized!')
    } catch (err) {
      console.log('Error initializing database:' + err.code + ' / ' + err.message)
    }

  }

  // Handle query's and potential errors
  function query(sqlSentence, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, sqlSentence, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  function getAll(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  function getById(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }
}

function SQLDatabase(DBA) {

  return {
    addPlatform: addPlatform,
    getAllPlatforms: getAllPlatforms
  };

  function addPlatform(platform) {
    var parameters = [platform.name, platform.minimumLength, +platform.acceptedCharacters.lowercase,
      +platform.acceptedCharacters.uppercase, +platform.acceptedCharacters.digit,
      +platform.acceptedCharacters.symbol, platform.color];
    return DBA.query("INSERT INTO platforms (name, minimumLength, lowercase, uppercase, digit, symbol, color) " +
      "VALUES (?,?,?,?,?,?,?)", parameters);
  }

  function getAllPlatforms() {
    return DBA.query("SELECT * FROM platforms")
      .then(function (result) {
        var allPlatforms = [];

        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          platform = {
            name: row.name,
            minimumLength: row.minimumLength,
            acceptedCharacters: {
              lowercase: row.lowercase != 0,
              uppercase: row.uppercase != 0,
              digit: row.digit != 0,
              symbol: row.symbol != 0
            },
            color: row.color
          };
          allPlatforms.push(platform);
        }
        console.log('Getting all the platforms:'+JSON.stringify(allPlatforms));
        return allPlatforms;
      });
  }

}
