import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim: true,
            lowercase:true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim: true,
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=async function name() {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            username: this.username,
            email: this.email,
          },
          process.env.ACSESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
    )
    
}

userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })
}
export const User=mongoose.model("User",userSchema)