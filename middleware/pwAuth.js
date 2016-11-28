const crypto = require('crypto-js');

module.exports = function(db){
  return {
    requireAuthentication: (req, res, next) =>{

    //retrieve token from header using get method (If there is none, token is empty string)
    var token = req.get('Auth') || '';
    //Use token to recreate hash using cryptojs
    var tokenHash = crypto.MD5(token).toString();
    //Find token in the DB using hash
    db.token.findOne({where:{
      hash: tokenHash
    }}).then((token)=>{
      // if there is a match, find user by token
      if(!token){
        throw new Error('Invalid or missing token.');
      }
      //set req.token to be the token value
      req.tokem = token;
      return db.User.findByToken(token);
      //if user is found, return the user.
    }).then((user)=>{
      //set the req.user to be the user
      req.user = user;
      //keep calm and carry on...
      next();
    })

  } //end requireAuthentication
}; //end return
}; //end module.exports
