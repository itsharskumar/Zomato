const userModel=require('../models/user.model');
const foodPartner=require('../models/foodPartner.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

require('dotenv').config();
const registerUser=async (req,res)=>{

    try{
        const {fullName,email,password}=req.body;

        const isUserAlreadyRegistered=await userModel.findOne({email});

        if(isUserAlreadyRegistered)
        {
            return res.status(400).json({
                sucess:false,
                message:"User alreay registered"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await userModel.create({
            fullName,
            email,
            password:hashedPassword
        })

        const payload={
            id:user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "3d"
});

    res.cookie('token',token,{
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
  })

  res.status(201).json({
    message:"user Created Sucessfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
  })
    }catch(error)
    {
        return res.status(501).json({
            sucess:false,
            message:"Not complete request at a time"
        })
    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logoutUser=(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({
    sucess:true,
    message:"user logged out sucessfully"
  })
}

const registerFoodPartner=async (req,res)=>{

    try{
      const {name,email,password,phone,address,contactName}=req.body;

      const find=await foodPartner.findOne({email});
      if(find)
      {
        return res.status(400).json({
          sucess:false,
          message:"user already exists"
        })
      }

      const hashedPassword=await bcrypt.hash(password,10);
      const foodpartner=await foodPartner.create(
        {
          name,
          email,
          password:hashedPassword,
          phone,
          address,
          contactName
        }
      )
      const token=jwt.sign({
        id:foodpartner._id,
        email:foodpartner.email
      },process.env.JWT_SECRET,{
        expiresIn: "3d"
      });

      res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        message:"food Partner registered sucessfully",
        foodpartner:{
          id:foodpartner._id,
          name:foodpartner.name,
          email:foodpartner.email,
          phone:foodpartner.phone,
          address:foodpartner.address,
          contactName:foodpartner.contactName

        }
      })
    }catch(error)
    {
        console.error(error.message);
        res.status(500).json({
          success:false,
          message:"Registration failed"
        })
    }
}

const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foodpartner = await foodPartner.findOne({ email });
    if (!foodpartner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, foodpartner.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: foodpartner._id,
      email: foodpartner.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Food Partner logged in successfully",
      foodpartner: {
        id: foodpartner._id,
        email: foodpartner.email,
        name: foodpartner.name,
      },
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Food Partner logged out successfully"
  })
}

module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner};