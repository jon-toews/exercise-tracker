
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const liftSchema = new Schema({
    lift_type: {
        type:String,
        required: [true, "You must specify a lift"]
    },
    sets: Number,
    reps: Number,
    weight: Number,
    notes: String,
});


const workoutSchema = new Schema({
  lifts: [liftSchema],
  notes: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  date: {
      type: Date,
      default: Date.now
  },
  user_id: {
      type: Schema.Types.ObjectId, 
      ref: 'user'
  }
});

module.exports = mongoose.model('workout', workoutSchema)