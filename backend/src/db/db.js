const mongoose=require('mongoose');

require('dotenv').config()
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected sucessfully");

    }catch(error){
        console.log("erorr"+error.message);
    }
}

module.exports=connectDB;