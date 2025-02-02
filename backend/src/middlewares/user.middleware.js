import { User } from "../modals/user.modal.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken"

const verifyJwt=asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken;
    
        if (!token) {
          throw new apiError(401, "Unauthorized Access");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACSESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id);
        if (!user) {
          throw new apiError(401, "Inavlid Token");
        }
    
        req.user = user;
        next();
      } catch (error) {
        throw new apiError(400, error?.message || "Invalid Access Token");
      }
})

export {verifyJwt}
