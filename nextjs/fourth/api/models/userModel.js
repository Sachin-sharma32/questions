const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  photo: String,
  changedPasswordAt: Date,
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:"user",
    enum:{
      values:["user", "admin", "guide"],
      message:"values of role can only be user or admin"
    }
  },
  passwordResetToken:String,
  passwordResetExpire:Date,
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  this.passwordConfirm = undefined
})

userSchema.methods.checkPassword = async (inputPassword, savedPassword) => {
  return await bcrypt.compare(inputPassword, savedPassword)
}

userSchema.methods.changedPasswordAfter = async function (jwtTime) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return changedTimeStamp > jwtTime;
  }
  return false
}

userSchema.methods.getPasswordResetToken = async function(){
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
  return this.passwordResetToken;
}

userSchema.pre('save', function (next){
  if(!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = Date.now() -1000;
  next()
})



const User = mongoose.model('User', userSchema)
module.exports = User
