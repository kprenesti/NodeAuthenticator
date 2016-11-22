const bcrypt = require('bcrypt');
const db = require('../db');
const _ = require('lodash');

module.exports = (db.sequelize, DataTypes)=>{
  return sequelize.define('User', {
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
        var salt = bcrypt.genSaltCrypt(10);
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
      }
    }
  })
};
