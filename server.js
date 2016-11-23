const env = require('dotenv').config();
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('./db/db.js');
var PORT = process.env.PORT || 3100;
const authorize = require('./middleware/pwAuth');
// var hash = bcrypt.hashSync(db.user.password, 10);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'hbs');


// app.get('/userPage', authorize.requireAuthentication,  (req, res)=>{
//
//
// });

//CREATE USER
app.post('/users', (req, res)=>{
  var body = _.pick(req.body, 'firstName', 'lastName', 'email', 'password');
  db.user.create(body).then((user)=>{
    res.json(user.toPublicJSON()).send();
  }, (e)=>{
    res.status(400).json(e);
  });
});




//LOGIN AND VALIDATE
app.post('/users/login', (req, res)=>{
  var body = _.pick(req.body, 'email', 'password');
  if(_.isString(body.email) && _.isString(body.password)){
    //find user in DB by email within authenticate method, which also checks PW
    db.user.authenticate(body).then((user)=>{
      if(!user){
        return res.status(401).send();
      }
      res.json(user.toPublicJSON()).send();
      //Create JWT token

    });

  } else {
    res.status(400).send();
  }
});


db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});

// module.exports = app();
