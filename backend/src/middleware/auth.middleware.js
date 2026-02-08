const foodPartner=require('../models/foodPartner.model');
const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const authFoodPartner=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json(
                {
                    sucess:false,
                    message:"Please Login First"
                }
            )
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        
        if(typeof decoded === 'string' || !decoded.id || !decoded.email){
            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            })
        }
        
        const foodpartner=await foodPartner.findById(decoded.id)
        
        if(!foodpartner || foodpartner.email !== decoded.email){
            return res.status(401).json({
                success:false,
                message:"Food Partner not found or email mismatch"
            })
        }

        req.foodpartner = foodpartner;
        next();

    }catch(error){
        return res.status(401).json({
                message:"Invalid Token"
            })
    }
}

const authUserMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"Please Login First"
                }
            )
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        
        if(typeof decoded === 'string' || !decoded.id || !decoded.email){
            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            })
        }
        
        const user=await userModel.findById(decoded.id)
        
        if(!user || user.email !== decoded.email){
            return res.status(401).json({
                success:false,
                message:"User not found or email mismatch"
            })
        }

        req.user = user;
        next();

    }catch(error){
        return res.status(401).json({
                message:"Invalid Token"
            })
    }
}

module.exports={authFoodPartner,authUserMiddleware};