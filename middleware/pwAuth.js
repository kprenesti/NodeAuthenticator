module.exports = function(db){
  return requireAuthentication: function(req, res, next){
    var token = req.get('Auth'); // retrieved from headers in main request.
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
  }
};
