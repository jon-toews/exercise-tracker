const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type:String,
        unique: [true, "that username has been taken :("]
    }
});

module.exports = mongoose.model('user', userSchema)