const crypto = require('crypto-js');

module.exports = function(db){
  return {
    requireAuthentication: (req, res, next) =>{
    //retrieve token from header
    var token = req.get('Auth') || ''; // retrieved from headers in main request.

    db.user.findByToken(token)
    .then((user)=>{
      if(user){
        req.user = user;
        next();
      }
    })
    .catch((e)=>{
      res.status(401).send(e.toJSON());
    })
  }}
};
