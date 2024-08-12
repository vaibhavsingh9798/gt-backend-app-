const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

exports.signup = async (req,res) =>{
    const {name,phone,email,profession,password} = req.body
    const saltRound = 10
    try{

        if([name,phone,email,profession,password].some((field) => field.trim() == ""))
            return res.status(400).json({success:false,message:'All field are required'});

        const exitedUser = await User.findOne({email})
        if(exitedUser)
            return res.status(409).json({success:false,message:'User already exist with email'});
        
        const hashPassword = await bcrypt.hash(password,saltRound)
        const user = await User.create({name,phone,email,profession,password:hashPassword})

        return res.status(201).json({success:true,message:`User ${user.name} registred successfully`})

    }catch(err){

        return res.status(500).json({success:false,message:'Something went wrong while registring the user !'})
    }
}


exports.login = async (req,res) =>{
    const {email,password} = req.body
    try{

        if(!email)
            return res.status(400).json({success:false,message:'email is required !'});

          const user = await User.findOne({email})

          if(!user)
            return res.status(404).json({success:false,message:'User does not exist!'});
    
        const isPasswordValid = await bcrypt.compare(password,user.password)
    
        if(!isPasswordValid){
            return res.status(401).json({success:false,message:'Invalid user credentials'});
        }

        const genrateToken = (payload) => {
            return jwt.sign(payload,process.env.SECRET_KEY)
        }
    
        return res.status(200).json({success:true,message:'User logged In Successfully',token:genrateToken({userId:user._id})})

    }catch(err){

        return res.status(500).json({success:false,message:'Internal Server Error !'})
    }
}


exports.getUsers = async (req,res) =>{
    try{
        const users = await User.find()
        return res.status(200).json({success:true,message:'Get users',data:users})

    }catch(err){

        return res.status(500).json({success:false,message:'Internal Server Error !'})
    }
}


exports.updateUser = async (req,res) =>{
    const updates = req.body;
    const {id} = req.params;
    console.log('update ...',id,updates)
    try{
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(201).json({success:true,data:updatedUser});
          
    }catch(err){

        return res.status(500).json({success:false,message:'Internal Server Error !'})
    }
}

exports.deleteUser = async (req,res) =>{
    const userId = req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({success:false, message: 'User not found' });
        }
        res.status(200).json({success:true, message: 'User deleted successfully' });
    }catch(err){
        return res.status(500).json({success:false,message:'Internal Server Error !'})
    }
}