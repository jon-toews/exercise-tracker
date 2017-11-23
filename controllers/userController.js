const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require('express-validator/filter');

// express-validator validation
exports.validateRegister = [
  check('username')
    .exists()
    .custom(value => {
      return User.findOne({ username: value }).then(user =>{
        console.log(user);
        if(!user) {
          console.log('not user');
          return true;
        }
        throw new Error('username taken');
      })
    }),
  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .normalizeEmail(),
  check('password', 'password must be atleast 3 chars')
    .exists()
    .isLength({ min: 3}),
  check('confirm', 'passwords do not match')
    .exists()
    .custom((value, { req }) => value === req.body.password)
]

// fake register
exports.register = async (req, res) => {
  console.log("matched: ", matchedData(req));
  const errors = validationResult(req);
  console.log("errors mapped: ", errors.mapped());

  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      success: false, 
      message: 'validation errors',
      errors: errors.mapped() });
  }
  const user = new User({username: matchedData(req).username});

  User.register(user, matchedData(req).password, (err, user) => {
    if (err) return res.status(400).json({
      success: false,
      message: 'Could not process the form.'
    });
    console.log('registering');
    return res.status(200).json({
      success: true,
      message: 'You have succesfully signed up'
    });
  })
}

// express-validator validation
exports.validateLogin = [
  check('username')
    .exists()
    .isLength({min: 1}),
  check('password', 'password must be atleast 3 chars')
    .exists()
    .isLength({ min: 3})
]

exports.login = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped() });
  }
  return res.status(200).end();
}
  
