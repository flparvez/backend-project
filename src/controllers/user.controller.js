
import { ApiError } from "../utils/ApiError.js";
import { asynHandler } from "../utils/asynqhandler.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynHandler(async (req, res) => {
    // get user details frontend
    // validation - not empty
    //  check a user already exist - email,username 
    // check for images , check for avatar
    //  upload them to cloudinary
    //  create user object - crate entry in db
    // remove password and refresh token field from response
    //  check for user creation 
    // return res


    const { username, email, fullName, password } = req.body

    console.log("UserName:", username)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All Field Are Required")
    }


    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User With Email And Username Already exist")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImagerLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar Files Is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagerLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar Files Is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while user register")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


export { registerUser }