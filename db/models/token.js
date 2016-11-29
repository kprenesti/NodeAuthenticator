const cryptojs = require('crypto-js');


module.exports = (sequelize, DataTypes)=>{
  return sequelize.define('token', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      set: function (value){
        //first, take the given value and create a hash that can be stored in the DB
        var hash = cryptojs.MD5(value).toString();
        //then set the value to the token, which is only virtually stored in a DB
        this.setDataValue('token', value);
        //and set the value of the hash to the crypted hash.
  			this.setDataValue('tokenHash', hash);
    } //end set
  }, //end token
  tokenHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}); //end sequelize.define
}; ///end module.exports
