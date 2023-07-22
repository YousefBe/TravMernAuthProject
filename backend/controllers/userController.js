import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @description login user
// @route POST api/users/auth
// @access public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email});

  try {
    await checkUserExists(res, user , true ,password ,{
      statusCode : 401 ,
      msg :`invalid Credentials`
    })
  } catch (error) {
    throw error;
  }

});

// @description register user
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error(`User already exists`);
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  try {
    await checkUserExists(res, user , false ,null ,{
      statusCode : 401 ,
      msg :`invalid User data`
    })
  } catch (error) {
    throw error;
  }

  // if (user) {
  //   generateToken(res, user._id)
  //   res.status(201).json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error(`invalid User data`);
  // }
});

// @description logout user
// @route POST api/users/logout
// @access authenticated
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt','',{
    httpOnly : true,
    expires : new Date(0)
  })

  res.status(200).json({
    message: "logout user",
  });
});

// @description get user profile
// @route get api/users/profile
// @access authenticated
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = {
    _id : req.user._id,
    name : req.user.name,
    email : req.user.email, 
  }

  res.status(200).json(user);
});

// @description update user profile
// @route put api/users/profile
// @access authenticated
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id : updatedUser._id,
      name : updatedUser.name,
      email : updatedUser.email, 
    }
  );
  }else{
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "update user profile",
  });
});



const checkUserExists = async (res, user, isLogin , loginPassword ,error) => {
  let checkCondidtion = user;

  if (!user) {
    res.status(error.statusCode);
    throw new Error(`${error.msg}`);
    return;
  }

  if (isLogin) {
    const correctPassword = await user.matchPassword(loginPassword)
    checkCondidtion = user && correctPassword
  }

  if (checkCondidtion) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(error.statusCode);
    throw new Error(`${error.msg}`);
  }
};


export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
