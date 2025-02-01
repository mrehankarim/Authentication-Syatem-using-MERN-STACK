
import { User } from "../modals/user.modal.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import apiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const generateAccessAndRefreshToken=asyncHandler(async (user_id)=>{

    try {
        const user=await User.findById(user_id)
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()
        user.save({validateBeforeSave: false})
        return {accessToken,refreshToken}
        
        
    } catch (error) {
        throw new apiError(500,"Something went wrong while genareting access and refrsh token",error)
        
    }
})

const registerUser=asyncHandler(async (req,res)=>{
    //get data from front end
    //valid data
    //chek if user already exits
    //save data to db 
    //check if user is created 
    const {username,email,password,fullName}=req.body;
    if(
        [username,email,password,fullName].some((field)=>field?.trim()==="")
    )
    {
        throw new apiError(400,"All fields are quired")
    }
    const userExist=await User.findOne({
        $or:[{username},{email}]
    })

    if(userExist)
    {
        throw new apiError(400,"User already exists")
    }

    const user=await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    })
    if (!user) {
        throw new apiError(500, "Something went wrong while creating User");
      }
      const createdUser=await User.findById(user._id).select("-password")
      return res.status(200).json(new ApiResponse(200,createdUser,"User created Succssfully"))
} )


export {registerUser}