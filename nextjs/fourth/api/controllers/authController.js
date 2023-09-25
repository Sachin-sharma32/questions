const catchAsync = require('../utils/catchAsync')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email')
const crypto = require('crypto')

exports.signUp = catchAsync(async(req,res)=>{
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });
  
  const token = jwt.sign({id:user._id}, "sadfadfadf", {
    expiresIn: "90d"
  })

  res.status(200).json({
    status:"success",
    data:user,
    token
  })
})

exports.logIn = catchAsync(async(req,res,next)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if(!user || !(await user.checkPassword(password,user.password))){
    return next(new AppError("user don't exist of the password was incorrct", 404));
  }
  const token = jwt.sign({id: user._id}, "sadfadfadf", {
    expiresIn: "90d"
  })
  res.status(200).json({
    status:"sucess",
    message:"signed In",
    data: user,
    token
  })
})

exports.protect = catchAsync(async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError("You are not logged in", 401));
  }

  const verify = jwt.verify(token, "sadfadfadf");

  const user = await User.findById(verify.id);
  if(!user){
    return next(new AppError('user do not exist', 404))
  }

  // if(user.changedPasswordAfter(verify.iat)){
  //   return next(new AppError("you changed your passowrd. Please logIn again", 401));
  // }

  req.user = user;
  next();
})

exports.restrictTo = (...values) =>{
  return (req,res,next)=>{
    if(!values.includes(req.user.role)){
      return next(new AppError("you have no authorization to access this route", 401))
    }
    next();
  }
}

exports.forgotPassword = catchAsync(async(req,res,next)=>{
  const {email} = req.body;
  const user = await User.findOne({email})
  if(!user){
    next(new AppError('User do not exist', 404))
  }

  const resetToken = user.getPasswordResetToken()
  await user.save({validateBeforeSave: false});

  const resetUrl = `localhost:3000/api/v1/users/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: 'password reset',
    text: `go to ${resetUrl} to reset you password`
  })

  res.status(200).json({
    status:"success",
    message:"email sent"
  })
})

exports.resetPassword = catchAsync(async(req,res,next)=>{
  const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpire: {$gt: Date.now()}
  })
  if(!user) return next(new AppError("user don't exist or the token has")); 
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save({validateBeforeSave: false});

  const token = jwt.sign({id: user._id}, "sadfadfadf", {
      expiresIn: "90d"
  })
  res.status(200).json({
    status:"success",
    data:user,
    token
  })
})