const Lift = require("../models/Lift");

/**
 * API
 */

exports.getLifts = async (req, res) => {
  const lifts = await Lift.find({
    user_id: req.userId
  });
  
  res.json(lifts);
}

exports.getLiftType = async (req, res) => {
  console.log("lift type: ", req.params);

  const lifts = await Lift.find({ 
    user_id: req.userId,
    lift_type: req.params.type
  })

  res.json(lifts);
}

exports.postLift = async (req, res) => {
  if (!req.userId) {
    res.json({"error": "no user_id specified"});
    return;
  }
  // strip null id from request lift object
  const { _id, ...liftData } = req.body.data;
  console.log(liftData);
  const lift = await new Lift({ user_id: req.userId, ...liftData }).save();
  res.status(201).json(lift);

}

exports.editLift = async (req, res) => {
  console.log("editing lift", req.body);
  if (!req.userId) {
    res.status(204);
    res.json({"error": "no lift id specified"});
    return;
  }

  const lift = await Lift.findByIdAndUpdate(req.body._id, req.body, {new:true});
  res.json(lift);
}

exports.deleteLift = async (req, res) => {
  console.log("deleting", req.query);

  const lift = await Lift.findByIdAndRemove(req.query._id);
  res.send(lift._id)
}