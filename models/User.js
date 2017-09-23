var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});

var User = mongoose.model('User', UserSchema);
module.exports = User;