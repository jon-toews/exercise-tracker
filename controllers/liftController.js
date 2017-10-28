const Lift = require("../models/Lift");

exports.showLifts = async (req, res) => {
  const lifts = await Lift.find();
  console.log(lifts);
  res.render("lifts", { title: "Lifts", lifts });
};
exports.liftForm = (req, res) => {
  if (!req.session.username) {
    res.redirect('/register');
  }
  res.render("addLift", { title: "Lifts" });
};

exports.addLift = async (req, res) => {
  const lift = await new Lift(req.body).save();
  console.log(lift);
  res.redirect("lifts");
}


/**
 * API
 */

exports.getLifts = async (req, res) => {
  const lifts = await Lift.find();
  res.json(lifts);
}