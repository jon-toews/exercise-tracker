const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/User');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
