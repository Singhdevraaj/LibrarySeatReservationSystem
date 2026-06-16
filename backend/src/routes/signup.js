const app = require("../config/app.js");
const User = require('../models/user.js')
const {validateSignup} =require('../middleware/validation.js')

app.post('/signup',validateSignup,async (req,res)=>{
    const {name,email,password,role} = req.body;
   try{
    const checkExists=await User.findOne({email});
    if(!checkExists){
        await User.create({name,email,password,role});
        return res.status(201).json({
            "success":true,
            "message":"User Account created successfully"
        })
    }else{
        return res.status(409).json({
            success:false,
            "message":"User already exists"
        });
    }
   }catch(error){
    console.error("Error: "+error);
    return res.status(500).send("Internal Server Error");
   } 
})