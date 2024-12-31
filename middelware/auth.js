const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const encode =(req,res)=>{
    const user = res.userInfo;
    const token = jwt.sign({
        _id:user._id,
        email:user.email
    },process.env.JWT_SECRET_KEY,{
        expiresIn:"1y"
    });

    return res.status(200).json({
        message:"User logged in sucessfully",
        token: token,
        user:{
            _id : user._id,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            is_verified:user.is_verified,
            role:user.role,
        }
    })
}
const decode =async(req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(500).json({
                message:"Please Authenticate first"
            })
        }
        const authorizeToken = await req.headers.authorization.split(" ")[1];

        const decode = await jwt.verify(authorizeToken,process.env.JWT_SECRET_KEY);
    
        req.userData = decode;
        
        next();
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {encode ,decode};