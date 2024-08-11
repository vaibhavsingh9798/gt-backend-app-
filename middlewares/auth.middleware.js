const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')


exports.verifyJWT = async (req,res,next) =>{
    try{
   
        const token =  req.header('Authorization')?.replace('Bearer ',"")
        if(!token){
            return res.status(401).json({success:false,message:'Unauthorized request'})
        }

        const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        const user = await User.findById(decodedToken.userId).select("-password")
        req.user = user
         next()
    }catch(error){
        return res.status(401).json({success:false,message:'Unauthorized user'})
    }
}

