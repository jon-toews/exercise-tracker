const Lift = require("../models/Lift");

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