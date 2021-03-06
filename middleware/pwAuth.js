var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) {
      debugger;
			var token = req.get('Auth') || '';
			console.log('token as seen by the middleware: ', token);
			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
        console.log(tokenInstance);
        req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (returnedUser) {
        if(returnedUser){
          req.user = returnedUser;
          next();
        } else {
          console.log("There's no user, but I'm letting you move on anyway...Which is, in itself, an error...Hmm.")
        }

			}).catch(function () {
				res.status(401).send();
			});
		}
	};

};
