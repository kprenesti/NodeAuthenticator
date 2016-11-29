const crypto = require('crypto-js');

module.exports = function(db){
  return {
    requireAuthentication: (req, res, next) =>{

    //retrieve token from header using get method (If there is none, token is empty string)
    var token = req.get('Auth') || '';
    //Use token to recreate hash using cryptojs
    //Find token in the DB using hash
    db.token.findOne({
      where:{
        tokenHash: crypto.MD5(token).toString()
      }
    }).then(function (tokenInstance){
      // if there is a match, find user by token
      if(!tokenInstance){
        throw new Error();
      }
      //set req.token to be the token value
      req.token = tokenInstance;
      return db.user.findByToken(token);
      //if user is found, return the user.
    }).then(function(user){
      //set the req.user to be the user
      req.user = user;
      //keep calm and carry on...
      next();
    }).catch((e)=>{
      console.error(e);
      res.status(401).send();
    })

  } //end requireAuthentication
}; //end return
}; //end module.exports
