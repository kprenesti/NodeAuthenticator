const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes)=>{
  var user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 20],
        isAlphanumeric: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    salt: {type: DataTypes.STRING},
    password_hash: {type: DataTypes.STRING},
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set: function (val) {
        var salt = bcrypt.genSaltSync(10);
        var hashedPW = bcrypt.hashSync(val, salt); //value is the PW itself
        this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('salt', salt);
        this.setDataValue('password_hash', hashedPW);
      },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 6) {
            throw new Error("Please choose a longer password")
          }
        }
      }
    }
  }, {
    hooks: {
      beforeValidate: function(User, options){
        User.email = User.email.toLowerCase();
        User.username = User.username.toLowerCase();
      }
    },
    instanceMethods: {
      toPublicJSON: function(){
        var jsonObj = this.toJSON(); //toJSON is a sequelize instance method that returns an object, not JSON.  This is not the same as JSON.stringify
        return _.pick(jsonObj, 'id', 'username', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt' )
      },
      generateToken: function (typeOfToken){
        //Validate that input is a string
        if(!_.isString(typeOfToken)){
          return undefined;
        }
        try {
          //Get user id and typeOfToken, set into an object and stringify.
          var StringData = JSON.stringify({id: this.get('id'), type: typeOfToken});
          //encrypt that sucker!
          var encryptedData = crypto.AES.encrypt(StringData, process.env.CryptoKey).toString();
          var token = jwt.sign({
            token: encryptedData
          }, process.env.JWTKey);
          return token;
        } catch (e) {
          console.error(e);
          return undefined;
        }
      } //end generateToken
    }, //end instanceMethods
    classMethods: {
      authenticate: (body)=> {
        return new Promise((resolve, reject)=>{
          //Check to make sure they entered valid input types
          if(!body.password || typeof body.password !== 'string'){
            return reject();
          } else if(body.email){
            if(typeof body.email !== 'string') {
              return reject();
            }
            user.findOne({
              where: {
                email: body.email.toLowerCase()
              }
              //When (if) user found, check user against password.
            }).then((user)=>{
              //this is where the actual checking against PW happens!
              //Check to make sure that the bcrypted password_hash matches the inputed PW
              if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
                return reject('Incorrect Password.');
              }
              return resolve(user);
            });
          } else if(body.username){
            if(typeof body.username !== 'string'){
              return reject();
            }
            user.findOne({
              where: {
                username: body.username.toLowerCase()
              }
              //When (if) user found, check user against password.
            }).then((user)=>{
              //this is where the actual checking against PW happens!
              //Check to make sure that the bcrypted password_hash matches the inputed PW
              if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
                return reject('Incorrect Password.');
              }
              return resolve(user);
            });
          }

        }); //end new promise
      }, // end authenticate
      findByToken: function(token) {
        return new Promise(function(resolve, reject) {
          try {
            var decodedJWT = jwt.verify(token, process.env.JWTKey);
            var bytes = crypto.AES.decrypt(decodedJWT.token, process.env.CryptoKey);
            var tokenData = JSON.parse(bytes.toString(crypto.enc.Utf8));

            user.findById(tokenData.id).then(function (user) {
              if (user) {
                resolve(user);
              } else {
                reject();
              }
            }, function (e) {
              reject();
            });
          } catch (e) {
            console.error(e);
            reject();
          }
        });
      }
    } //end classMethods
  });
  return user;
};
