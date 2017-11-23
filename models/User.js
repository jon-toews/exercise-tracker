const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type:String,
        unique: [true, "that username has been taken :("]
    },
    email: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('user', userSchema)