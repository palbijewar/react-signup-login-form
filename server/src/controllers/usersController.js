import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {isValid,isValidReqBody,isValidPhoneNumber,isValidPassword,validateEmail,validString} from '../utils/utils.js';

dotenv.config();

export const signup = async (req,res) => {
    try {
    const {firstName,lastName,mobile,email,password} = req.body;
    //validations
    if(!firstName || !lastName || !mobile || !email || !password)return res.status(400).json({status:false,message:'enter all the fields'});
    
    if(!isValidReqBody(req.body)) return res.status(400).json({status:false,message:'empty request body!'}); 

    if(!validString(firstName)) return res.status(400).json({status:false,message:'incorrect format for name!'}); 

    if(!validString(lastName)) return res.status(400).json({status:false,message:'incorrect format for last name!'}); 

    if(!isValidPhoneNumber(mobile)) return res.status(400).json({status:false,message:'incorrect format for mobile number!'});

    if(!validateEmail(email)) return res.status(400).json({status:false,message:'incorrect format for email!'});

    if(!isValidPassword(password)) return res.status(400).json({status:false,message:'password length must be 8 to 15 and use capital letters, symbol and a number to make it string enough!'}); 

    //saving the user in DB
    const data = {firstName,lastName,mobile,email,password};
    const user =  await User.create(data);
    res.status(201).json({status:true,data:data});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});
    }
}

export const login = async (req,res) => {
    try {
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({status:false,message:'enter the fields'})  
    const user = await User.findOne({email:email});
    if(!user) return res.status(404).json({status:false,message:'no user found'});
    const checkPass = await User.findOne({password:password});
    if(!checkPass) return res.status(404).json({status:false,message:'incorrect password'});
    const token = jwt.sign({user:user._id.toString()},process.env.JWT_SECRET_KEY,{
        expiresIn:"3d"
    }) 
    res.setHeader('token',token);
    res.status(200).json({status:true,data:token});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});   
    }
}
