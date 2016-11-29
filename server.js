const env = require('dotenv').config();
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const _ = require('lodash');
const bcrypt = require('bcrypt');
const db = require('./db/db.js');
const jwt = require('jsonwebtoken');
var PORT = process.env.PORT || 3100;
const authorize = require('./middleware/pwAuth')(db);
// var hash = bcrypt.hashSync(db.user.password, 10);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

//===========================================//
// ================== USERS =================//
//===========================================//

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
  var userInstance;

    //find user in DB by email within authenticate method, which also checks PW
    db.user.authenticate(body).then((user)=>{
      // if(!user){
      //   return res.status(401).send();
      // }
      userInstance = user;
      var token = user.generateToken('authentication');
      return db.token.create({token: token});
    }).then((returnedToken)=>{
      console.log('returnedToken should not be the hashed value: ', returnedToken.get('token'));
      res.header('Auth', returnedToken.get('token')).json(userInstance.toPublicJSON());
    }).catch((e)=>{
      console.error(e);
      res.json(e);
    });


}); //end app.post login


app.delete('/users/login', authorize.requireAuthentication, (req, res)=>{
  req.token.destroy().then(()=>{
    res.status(204).send();
  }).catch((e)=>{
    console.log(e);
    res.status(500).send(e.toJSON());
  });
});

db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});

// module.exports = app();
