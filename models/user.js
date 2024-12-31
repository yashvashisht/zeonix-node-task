const mongoose = require('mongoose');
const Role = require('./role');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    first_name : {
        type:String,
        required:true,
    },
    last_name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true,
    },
    role: {
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Role',
        required:true,

    },
    status:{
        type:Number,
        default:1,
    },
    is_verified :{
        type:Number,
        default:0,
    },
    time : {
        type : Date,
        default: Date.now 
    }
});

userSchema.virtual("product", {

    ref: "Product",
    
    foreignField: "user",
    
    localField: "_id",
    
    // justOne: true
});
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User',userSchema);