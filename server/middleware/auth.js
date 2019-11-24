const { User } = require('../models/user');

let auth = (req, res, next) => {
  let user = new User;
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if(err) throw Nerr;
    if(!user) return res.json({
      isAuth: false,
      error: true
    });

    req.token = token;
    req.user = user;
    next();
  });
}

module.exports = { auth };