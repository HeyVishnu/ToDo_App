import bcrypt from 'bcrypt'
import User from '../models/user.js';

import { sendCookie } from '../util/cookie.js';





export const register = async(req,res,next) =>{
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user)  return next(new Error("Already Registered"));
       

    const hashpassword = await bcrypt.hash(password, 10);
    

    user = await User.create({
        name: name,
        email: email,
        password: hashpassword
    });

sendCookie(user,"succesfully registered",res);

}

export const login= async(req,res,next) => {

    const { email , password} = req.body;

    const user = await User.findOne({email});

    if(!user) return next(new Error("register First"));
        

     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch) return next(new Error("Incorrect Password"));

     sendCookie(user,`Welcome ${user.name}`, res);
}

export const getmyprofile = async(req,res,next) =>{
    const user = req.user
    if(!user) return next(new Error("No such user"));
        

    res.status(200).json({
        user,
    })

}

export const logout = (req,res)=>{
    res.status(200).cookie("token", "",{expires: new Date(Date.now())}).json({
        success: true,
        message: "logout successFull"
    })
}