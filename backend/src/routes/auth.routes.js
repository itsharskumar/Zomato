const express=require('express');
const {registerUser, loginUser, logoutUser, loginFoodPartner, registerFoodPartner, logoutFoodPartner}=require('../controller/auth.controller')
const router=express.Router();

//userAuth apis
router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.get('/user/logout',logoutUser);

//fodPartner Login logout and signin

router.post('/food-partner/register',registerFoodPartner);
router.post('/food-partner/login',loginFoodPartner);
router.get('/food-partner/logout',logoutFoodPartner);

module.exports=router;