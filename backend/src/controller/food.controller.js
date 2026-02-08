const foodModel=require('../models/food.model');
const storageService=require('../services/storage.service');
const {v4:uuid}=require('uuid');
const createFood=async(req,res)=>{
    try{
        // console.log(req.foodpartner);
        // console.log(req.body);
        // console.log(req.file);
        
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Video file is required"
            })
        }
        
        const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid());
        console.log(fileUploadResult);
        const foodItem=await foodModel.create({
            name:req.body.name,
            description:req.body.description,
            video:fileUploadResult.url,
            foodPartner:req.foodpartner._id

        })
        return res.status(201).json(
            {
               success:true,
               message:"food created Successfully",
               food:foodItem
            }
        )
    }catch(error){
        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"Failed to create food item"
        })
    }
}

const getFoodItems=async(req,res)=>{
    const foodItems=await foodModel.find({});

    res.status(200).json({
        message:"Food items fetched sucessfully",
        food:foodItems
    })
}
module.exports={createFood,getFoodItems};