const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const liftSchema = new Schema({
    lift: {
        type:String,
        required: [true, "You must specify a lift"]
    },
    sets: Number,
    reps: Number,
    weight: Number,
    notes: String,
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    }
});

module.exports = mongoose.model('lift', liftSchema)