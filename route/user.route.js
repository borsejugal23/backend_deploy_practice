const express=require("express");
const { userModel } = require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {username,email,password,location,dob,role}=req.body;

    try {
        const existinguser=await userModel.find({email});
        if (existinguser.length){
            return res.status(200).json({msg:"user has already registered, please login"})
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if (err){
                    res.status(400).json({msg:err.message})
                }
                else{
                    const newuser=new userModel({username,email,password:hash,dob,role,location})
                    await newuser.save();
                    return res.status(200).json({msg:"user has registerd successfully"})
    
                }
    
    
            })
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {username,password}=req.body;

        const existinguser= await userModel.findOne({username});

        if (!existinguser){
            return res.status(404).json({msg:"user not found,registered first"})
        }

        bcrypt.compare(password,existinguser.password,async(err,result)=>{
            if (result){
               let token= jwt.sign({userID:existinguser._id,username:existinguser.username},process.env.secretKey);
               return res.status(200).send({msg:"Login successful",token})
            }
            else{
               return res.status(200).send({msg:err.message})
            }
        })


    } catch (error) {
        res.status(400).json({error:error.message})

    }
})

userRouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1] || null;
  
      if (token) {
        await blackModel.updateMany({}, { $push: { blacklist: token } });
        res.status(200).send({ msg: "Logout successful" });
      } else {
        res.status(400).send({ msg: "No token provided" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  
module.exports={userRouter}