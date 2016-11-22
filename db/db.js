var db = {};


db.Sequelize = require('sequelize');
var dbUsername = undefined,
    dbPassword = undefined,
    dbName = undefined;
db.sequelize = new db.Sequelize(dbName, dbUsername, dbPassword, {
  dialect: 'sqlite',
  host: 'localhost',
  storage: __dirname + '/AuthenticationDB.sqlite'
});

db.user = sequelize.import(__dirname + '/models/user.js');

// db.sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

module.exports = db;
