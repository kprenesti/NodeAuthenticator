const Sequelize = require('sequelize');
var dbUsername = undefined,
    dbPassword = undefined,
    dbName = undefined;
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    dialect: 'sqlite',
    host: 'localhost',
    storage: __dirname + '/AuthenticationDB.sqlite'
});
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');

// db.sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

db.token.belongsTo(db.user);
db.user.hasOne(db.token);

module.exports = db;
