const express=require('express');
const cookieParser = require("cookie-parser");
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const cors=require('cors');
const app=express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"hello this is harsh"
    })
})

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
module.exports=app;