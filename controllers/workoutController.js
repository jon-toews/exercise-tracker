const Workout = require("../models/Workout")
const moment = require('moment')

exports.testAddWorkout = async (req, res) => {
  const sampleWorkout = {
    Workouts: [{
      Workout_type: "Klokov Press",
      sets: 2,
      reps: 5,
      weight: 280,
    }],
    notes: "ain't nothin to it but to do it!",
    rating: 5,
    user_id: "5a1257e39aa2aa451a070f92"
  }

  const workout = new Workout(sampleWorkout)
  console.log(workout)

  const firstId = workout.Workouts[0]._id

  const otherWorkout = {
    Workout_type: "Jonathan Curl",
    weight: 500,
  }

  workout.Workouts.push(otherWorkout)

  workout.Workouts.id(firstId).Workout_type = "Smolov Squat"

  const saved = await workout.save()
  res.status(201).json(saved)
}

exports.addWorkout = async (req, res) => {
  const workout = await new Workout(req.body).save()
  console.log('adding new workout: ' + workout)
  res.status(201).json(workout)
}

exports.editWorkout = async (req, res) => {
  const { _id, ...workoutData } = req.body
  const workout = await Workout.findByIdAndUpdate(_id, workoutData, {new:true})
  console.log('updating workout', workout)
  res.status(200).json(workout)
}

exports.deleteWorkout = async (req, res) => {
  console.log("deleting", req.query)

  const workout = await Workout.findByIdAndRemove(req.query._id)
  res.send(workout)
}

