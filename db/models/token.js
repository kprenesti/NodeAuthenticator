const crypto = require('crypto-js');


module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('token', {
    token: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [1]
      },
      set: (value)=>{
        //first, take the given value and create a hash that can be stored in the DB
        var hash = cryptojs.MD5(value).toString();
        //then set the value to the token, which is only virtually stored in a DB
        this.setDataValue('token', value);
        //and set the value of the hash to the crypted hash.
  			this.setDataValue('tokenHash', hash);
    } //end set
  }, //end token
  hash: {
    type: DataTypes.STRING
  }
}); //end sequelize.define
}; ///end module.exports
