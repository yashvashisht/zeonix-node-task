import mongoose from "mongoose";
import User from "./user";

const userAddressSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number
    },
    time : {
        type : Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('UserAddress',userAddressSchema);