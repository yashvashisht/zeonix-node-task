const User    = require('../models/user');
const { default: mongoose } = require('mongoose');

module.exports = {

    getAllUser:(req,res,next)=>{
        User.find().then(result=>{
            res.status(200).json({
                message:"User list loaded sucessfully",
                data: result.map((x)=> {
                    return {id:x._id,first_name:x.first_name,last_name:x.last_name,email:x.email,status:x.status};
                }),
            })
        }).catch(err=>{
            res.status(500).json({
                message:err.message
            })
        })
    },

    getUserDetailById: async (req,res,next) => {
        try {
            const id = req.params.id;
        
            const user = await User.findOne({_id:id});
        
            if(!user){
                return res.status(404).json({
                    message:"something went wrong"
                })
            }
            res.json({
                message: "User loaded successfully",
                data: {user},
              });
        } catch (error) {
            return res.status(500).json({
                message:error.message
            })
        }
        
},

}