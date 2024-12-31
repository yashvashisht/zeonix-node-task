const mongoose = require('mongoose');
const user = require('./user');

const passwordResetSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user_id : {
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
    token :{
        type:String,
        required:true,
    },
    time : {
        type : Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('PasswordReset',passwordResetSchema);