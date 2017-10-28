const User = require("../models/User");

exports.register = async (req, res) => {
  const username = req.body.username;
  const user = await new User({ username }).save();
  req.session.username = user.username;
  res.send("registered");
}

exports.registerPage = (req, res) => {
  res.render("register");
}

