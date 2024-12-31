const Role = require('../models/role');
const mongoose = require('mongoose');

module.exports = {

createRole:async(req,res,next)=>{
    try {
        const role = Role({
            _id: new mongoose.Types.ObjectId,
            label:req.body.label,
            role :req.body.role,
        });
    
        await role.save().then(result =>{
            res.status(201).json({
                message:"role created sucessfully",
                data:result,
            })
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
},

updateRole:(req,res,next)=>{
    const id = req.params.id;
    const role = req.body.role;
    const label = req.body.label;

    Role.findOneAndUpdate({_id:id},{
        label:label,
        role:role,
    }).then(async result=>{

        const updateRole = await Role.findOne({_id:result._id});
        res.status(201).json({
            message:"role updated sucessfully",
            data:updateRole
        })
    }).catch(err=>{
        res.status(500).json({err:err.message});
    })
},

deleteRole:(req,res,next)=>{
    const id = req.params.id;

    Role.deleteOne({_id:id}).then(result=>{
        res.status(200).json({
            message:"User deleted sucessfully",
        })
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
},

getAllRoles:(req,res,next)=>{
    Role.find().then(
        result =>{
            res.status(200).json({
                message:"Roles loaded sucessfully",
                data: result.map((x)=>{
                    return [{
                        id:x._id,
                        label:x.label,
                        role:x.role,
                    }]
                })
            })
        }
    )
}

}