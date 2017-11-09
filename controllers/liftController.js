const Lift = require("../models/Lift");

exports.showLifts = async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  const lifts = await Lift.find({ user_id: req.session.user._id });
  res.render("lifts", { title: "lifts", lifts, username: req.session.user.username });
};
exports.liftForm = (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  } 
  res.render("addLift", { title: "Lifts" });
};

exports.addLift = async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  const { lift_type, sets, reps, weight, date, notes } = req.body;
  console.log(req.session);
  const lift = await new Lift({
    lift_type,
    sets,
    reps,
    weight,
    date,
    notes,
    user_id: req.session.user._id
  }).save();
  next();
}

/**
 * API
 */

exports.getLifts = async (req, res) => {
  console.log(req.query);
  const lifts = await Lift.find({
    user_id: req.query.user_id,
  });
  
  res.json(lifts);
}

exports.postLift = async (req, res) => {
  if (!req.body.user_id) {
    res.json({"error": "no user_id specified"});
    return;
  }
  
  // strip _id property for request body

  const {_id, ...rest} = req.body;

  const lift = await new Lift(rest).save()
  console.log(lift)
  res.status(201)
  res.json(lift);
}

exports.editLift = async (req, res) => {
  console.log("editing lift", req.body);
  if (!req.body._id) {
    res.status(204);
    res.json({"error": "no lift id specified"});
    return;
  }
  // TODO verify user_id

  const lift = await Lift.findByIdAndUpdate(req.body._id, req.body, {new:true});
  res.json(lift);
}

exports.deleteLift = async (req, res) => {
  console.log("deleting", req.query);
  if (!req.query._id) {
    res.status(204);
    res.json({"error": "no lift id specified"});
    return;
  }
  // TODO verify user_id

  const lift = await Lift.findByIdAndRemove(req.query._id);
  res.send(lift._id)
}