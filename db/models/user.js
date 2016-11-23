const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const _ = require('lodash');

module.exports = (sequelize, DataTypes)=>{
  var user = sequelize.define('User', {
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
      }
    },
    instanceMethods: {
      toPublicJSON: function(){
        var jsonObj = this.toJSON(); //toJSON is a sequelize instance method that returns an object, not JSON.  This is not the same as JSON.stringify
        return _.pick(jsonObj, 'id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt' )
      },
      generateToken: function (type){

      }
    },
    classMethods: {
      authenticate: (body)=> {
        return new Promise((resolve, reject)=>{
          //Check to make sure they entered valid input types
          if(typeof body.email !== 'string' || typeof body.password !== 'string'){
            return reject();
          }
          //Locate the correct user by e-mail
          user.findOne({
            where: {
              email: body.email
            }
            //When (if) user found, check user against password.
          }).then((user)=>{
            //this is where the actual checking against PW happens!
            //Check to make sure that the bcrypted password_hash matches the inputed PW
            if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
              return reject();
            }
            resolve(user);
          })
        })
      }, // end authenticate
      findByToken: function(token, jwtPW, cryptoPW){
        return new Promise (function(resolve, reject){
          try {
            var decodedJWT = jwt.verify(token, jwtPW);
            var bytes = crypto.AES.decrypt(decodedJWT.token, cryptoPW);
            var tokenData = JSON.parse(bytes.toString(crypto.enc.UTF8));
          } catch (e) {

          } finally {

          }
        })
      }
    } //end classMethods
  });
  return user;
};
