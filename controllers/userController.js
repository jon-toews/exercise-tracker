const User = require("../models/User");

exports.register = async (req, res) => {
  const username = req.body.username;
  const user = await new User({ username }).save();
  req.session.user = user;
  res.redirect('/lifts/add');
}

exports.registerPage = (req, res) => {
  res.render("register", { title: "Register" });
}

exports.loginPage = (req, res) => {
  res.render("login", { title: "Login" });
}

exports.login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if(!user) {
    res.render('login', {message: "User does not exist"});
    return;
  }
  req.session.user = user;

  res.redirect('/lifts')
}

exports.logout = async (req, res, next) => {
  if(req.session.user) {
    req.session.destroy();
  }
  res.redirect('/login');
}

