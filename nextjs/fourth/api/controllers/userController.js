const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { getAll,getOne } = require('./handlerFactor')

exports.getAllUsers = getAll(User);

exports.getMe = (req,res,next)=>{
  req.params.id = req.user.id;
  next()
}

exports.getUser = getOne(User);

