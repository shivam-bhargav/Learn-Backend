import {asyncHandler} from "../utils/asyncHandler.utils.js";
import {ApiError} from "../utils/apiErrors.utils.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

const registerUser = asyncHandler(async(req,res,next)=>{
    // res.status(200).json({
    //         message:"ok"
    //     });
/*************************************************************************************************************/
    // get user details from frontend
    // validation - not empty
    // check if user already exist : username, email,
    // check for images, check for avatar        
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName,email,username,password} = req.body;
    console.log("email: ",email);

    //Advanced concept:
    if([fullName,email,username,password].some((field)=>{field?.trim()===""})){
        throw new ApiError(400,"All fields are required.")
    }
    // if(fullName === ""){
    //     throw new ApiError(400,"FullName is required")
    // }
    const existedUser = await User.findOne({
        $or:[{ username },{ email }]
    });
    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath= req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken")
    if(!createUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createUser," User registered Successfully")
    )
});

export {registerUser}