const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');



module.exports.asyncIsAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET, {ignoreExpiration: process.env.NODE_ENV !== 'production'});
    console.log('decoded: ', decoded);
    const userId = decoded.sub;
    const user = await User.findById(userId);
    if(!user) return res.status(401).end();
  
    req.userId = userId;
    req.username = user.username;
    next();
    
  } catch(e) {
    console.log("auth fail");
    res.status(401).end();
  }
}

module.exports.isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  console.log("header auth:", req.headers.authorization)

  /*return*/ jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // unauthorized
    if (err) { return res.status(401).end(); }

    console.log("decoded:", decoded);

    const userId = decoded.sub;

    // check if user exists

    /*return*/ User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      /*return*/ next();
    })
  })
}

module.exports.userName = (req, res) => {
  console.log('post auth check');
  res.json({ username: req.username });
}


module.exports.login = passport.authenticate('local', { session: false })


module.exports.issueToken = (req, res) => {
  console.log('post login');
  console.log(process.env.JWT_SECRET);
  // payload with subject and expiry
  const payload = { 
    sub: req.user._id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
   };

  // create a token string
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const data = {
    name: req.user.username
  }

  return res.json({
    success: true,
    message: 'You have logged in!',
    token,
    user: data
  });
}


module.exports.testRegister = (req, res) => {
  User.register({username:'fakeuser'}, 'passw', (err, user) => {
    if (err) {console.log("error:", err); return; }

    res.json(user);
    
  })
}

module.exports.logintut = (req, res, next) => {
  passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have logged in !',
      token,
      user: userData
    });
  });
}