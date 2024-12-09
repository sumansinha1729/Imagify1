import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay';

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing details"
        });
      }
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
  
      // Password validation
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password should be at least 6 characters long"
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userData = {
        name,
        email,
        password: hashedPassword
      };
  
      const newUser = new userModel(userData);
      const user = await newUser.save();
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      return res.status(201).json({
        success: true,
        token,
        user: { name: user.name }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  


const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})

        if(!user){
            return res.json({succes:false,message:"user does not exist"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}})
        }else{
            return res.json({succes:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:error.message})
    }
}


const userCredits=async(req,res)=>{
    try {
        const {userId}=req.body
        const user=await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:error.message})
    }
}


export {registerUser,loginUser,userCredits}