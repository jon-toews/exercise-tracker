const Lift = require("../models/Lift")
const moment = require('moment')

exports.getLifts = async (req, res) => {

  const query = { 
    user_id: req.userId
  }

  if (req.query.lift_type) {
    query.lift_type = req.query.lift_type  
  }

  if (req.query.from || req.query.to) {
    let fromDate = null
    let toDate = null

    if (req.query.from && moment(req.query.from).isValid()) {
      fromDate = moment(req.query.from)
    }
    if (req.query.to && moment(req.query.to).isValid()) {
      toDate = moment(req.query.to).endOf('day')
    }

    const from = fromDate ? { "$gte" : fromDate } : null
    const to = toDate ? { "$lte" : toDate } : null
    
    const dateRange = Object.assign({}, from, to)

    query.date = dateRange
  }
  
  console.log("get lift query", query);
  const lifts = await Lift.find(query)
  console.log('results:', lifts)
  
  res.json(lifts)
}

exports.distinctLifts = async (req, res) => {
  console.log(req.username)
  const uniqueTypes = await Lift
    .find({ user_id: req.userId })
    .distinct('lift_type')

  console.log("unique types: ", uniqueTypes)

  res.json(uniqueTypes)
}

exports.getLiftType = async (req, res) => {
  console.log("lift type: ", req.params)

  const lifts = await Lift.find({ 
    user_id: req.userId,
    lift_type: req.params.type
  })

  res.json(lifts)
}

exports.postLift = async (req, res) => {
  if (!req.userId) {
    res.json({"error": "no user_id specified"})
    return
  }
  // strip null id from request lift object
  const { _id, ...liftData } = req.body.data
  console.log(liftData)
  const lift = await new Lift({ user_id: req.userId, ...liftData }).save()
  res.status(201).json(lift)

}

exports.editLift = async (req, res) => {
  if (!req.userId) {
    res.status(204)
    res.json({"error": "no lift id specified"})
    return
  }
  const { _id, ...liftData } = req.body.data

  const lift = await Lift.findByIdAndUpdate(_id, liftData, {new:true})
  console.log('post update lift', lift)
  res.json(lift)
}

exports.deleteLift = async (req, res) => {
  console.log("deleting", req.query)

  const lift = await Lift.findByIdAndRemove(req.query._id)
  res.send(lift)
}