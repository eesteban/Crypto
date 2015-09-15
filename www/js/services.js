angular.module('crypto.services', [])

  .factory('DBAdminService', ['$q', DBAdmin]);

function DBAdmin($q) {
  var db, allCategories, allPasswords;

  return {
    initDB: initDB,

    addCategory: addCategory,
    deleteCategory: deleteCategory,
    getAllCategories: getAllCategories,
    addPassword: addPassword,
    deletePassword: deletePassword,
    getAllPasswords: getAllPasswords
  };

  //Init DB
  function initDB() {
    console.log('Initializing database...');
    try {
      db = new PouchDB('crypto', {adapter: 'websql'});

      fillDatabase();

      db.changes({ live: true, since: 'now', include_docs: true}).on('change', onDatabaseChange);

      console.log('Database successfully initialized!')
    } catch (err) {
      console.log('Error initializing database:' + err.code + ' / ' + err.message)
    }

  }

  function onDatabaseChange(change) {
    var array;
    if (change._id.match(/category_.*/)){
      array = allCategories;
    }else if(change._id.match(/password_.*/)){
      array = allPasswords;
    }
    var index = findIndex(array, change.id);
    var element = array[index];

    if (change.deleted) {
      if (element) {
        array.splice(index, 1); // delete
      }
    } else {
      if (element && element._id === change.id) {
        array[index] = change.doc; // update
      } else {
        array.splice(index, 0, change.doc); // insert
      }
    }
  }

  function findIndex(array, id) {
    return array.map(function (el) {
      return el.id;
    }).indexOf(id);
  }

  function addCategory(category){
    var id = 'category_custom_'+category.name;
    return $q.when(db.put(category, id));
  }

  function deleteCategory(category){
    return $q.when(db.remove(category));
  }

  function getAllCategories(){
    if (!allCategories) {
      return $q.when(db.allDocs({ include_docs: true,
        startkey: 'category_',
        endkey: 'category_\uffff'}))
        .then(function(docs) {

          allCategories = docs.rows.map(function(row) {
            return row.doc;
          });
          return allCategories;
        });
    } else {
      return $q.when(allCategories);
    }
  }

  function addPassword(password){
    var id = 'password_'+password.category+'_'+new Date().toJSON();
    return $q.when(db.put(password, id));
  }

  function deletePassword(password) {
    return $q.when(db.remove(password));
  }

  function getAllPasswords(){
    if (!allPasswords) {
      return $q.when(db.allDocs({ include_docs: true,
        startkey: 'password_',
        endkey: 'password_\uffff'}))
        .then(function(docs) {

          allPasswords = docs.rows.map(function(row) {
            return row.doc;
          });
          return allPasswords;
        });
    } else {
      return $q.when(allPasswords);
    }
  }

  function fillDatabase(){
    var email = {
      name: 'Email',
      color: 'positive',
      icon: 'ion-email'
    };
    addDefaultCategory(email);

    var socialNetwork = {
      name: 'Social network',
      color: 'positive',
      icon: 'ion-person-stalker'
    };
    addDefaultCategory(socialNetwork);

    var work = {
      name: 'Work',
      color: 'positive',
      icon: 'ion-briefcase'
    };
    addDefaultCategory(work);

    var forum = {
      name: 'Forum',
      color: 'positive',
      icon: 'ion-chatbox-working'
    };
    addDefaultCategory(forum);

    var bank = {
      name: 'Bank',
      color: 'positive',
      icon: 'ion-card'
    };
    addDefaultCategory(bank);

    var others = {
      name: 'Others',
      color: 'positive',
      icon: 'ion-earth'
    };
    addDefaultCategory(others);

  }

  function addDefaultCategory(category){
    var id = 'category_default_'+category.name;
    return $q.when(db.put(category, id));
  }
}

