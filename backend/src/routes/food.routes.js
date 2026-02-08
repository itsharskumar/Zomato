const express=require('express');
const foodController=require('../controller/food.controller');
const authMiddleware=require('../middleware/auth.middleware');
const router=express.Router();
const multer=require('multer');

const uplaod=multer({
    storage:multer.memoryStorage()
})
router.post('/',authMiddleware.authFoodPartner,uplaod.single("video"),foodController.createFood)

router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems);
module.exports=router;