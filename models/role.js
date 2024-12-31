const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    label : {
        type:String,
        required:true,
    },
    role :{
        type:String,
        required:true,
    },
    time : {
        type : Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Role',roleSchema);