import { User } from "../modals/user.modal.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import apiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const generateAccessAndRefreshToken = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new apiError(500, "Something went wrong while generating access and refresh token");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    //get data from front end
    //valid data
    //chek if user already exits
    //save data to db 
    //check if user is created 
    const { username, email, password, fullName } = req.body;
    if (
        [username, email, password, fullName].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are quired")
    }
    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) {
        throw new apiError(400, "User already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    })
    if (!user) {
        throw new apiError(500, "Something went wrong while creating User");
    }
    const createdUser = await User.findById(user._id).select("-password")
    return res.status(200).json(new ApiResponse(200, createdUser, "User created Succssfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    console.log("Login request hit");

    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(400, "User does not exist");
    }

    if (!(await user.isPasswordCorrect(password))) {  // ✅ Added await
        throw new apiError(400, "Invalid credentials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    console.log("testing");
    if (!accessToken || !refreshToken) {
        throw new apiError(500, "Access Token and Refresh Token Error");
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // ✅ Added sameSite option
    };



    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const refreshAccessAndRefreshToken = asyncHandler(async (req, res) => {

    const token = req.cookie.refreshToken || req.body.refreshToken

    if (!token) {
        throw new apiError(401, "unauthorized access");
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new apiError(401, "Invalid refresh Token")
    }
    if (token !== user?.refreshToken) {
        throw new apiError(401, "Refresh Token expired or used")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );
    if (!accessToken || !refreshToken) {
        throw new apiError(500, "access and refresh Token generation error");
    }
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // ✅ Added sameSite option
    };
    res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, {}, "Tokens refreshed successfully"));
})

const protectedData = asyncHandler((req, res) => {
    res.status(200).json(
        new ApiResponse(200, {
            books: ["Rich dad Poor Dad", "7 habits of highly effective people", "Jannat k Patty"]
        }, "Data sent successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    //find user
    //delete cookies from cleint
    //delete rT from db

    const user = await User.findByIdAndUpdate(req.user?._id, { $unset: { refreshToken: 1 } });

    if (!user) {
        throw new apiError(401, "Tokens expired while signing out");
    }
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", // ✅ Added sameSite option
    };
    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "user loggedOut"));
});

export { registerUser, loginUser, logoutUser }