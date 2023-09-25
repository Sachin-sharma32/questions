const mongoose = require('mongoose');
const User = require('./userModel');

const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    minlength:[2, 'tour name should be more than 2 char'],
    maxlenght:[100, 'tour name should be less then 100 char']
  },
  duration:{
    type:Number,
    default:5
  },
  maxGroupSize:{
    type:Number,
    default: 100
  },
  difficulty:{
    type:String,
    enum:{
      values:['easy', 'medium', 'difficult'],
      message:"Difficulty can only be easy medium or hard"
    }
  },
  ratingsAverage:{
    type:Number,
    min:[0, 'ratingsAverage should be more than or equal to 0'],
    max:[5, 'ratingsAverage should be less then or equal to 5'],
    default:4.5
  },
  ratingsQuantity:{
    type:Number,
    default:10
  },
  price:Number,
  summary:String,
  description:String,
  imageCover:String,
  images:[String],
  startDates:[Date],
  startLocations:{
    type:{
      type:String,
      default:'Point',
      enum:["Point"]
    },
    coordinates:[Number],
    address:String,
    description:String
  },
  locations:[
    {
      type:{
        type:String,
        default:"Point",
        enum:["Point"]
      },
      coordinates:[Number],
      address:String,
      description:String,
      day:Number
    }
  ],
  guides:[
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
})

tourSchema.pre("save", async function(next){
  const guidesPromise = this.guides.map(async id => await User.findById(id))
  this.guides = await Promise.all(guidesPromise)
  next();
})

tourSchema.pre(/^find/, function(next){
  this.populate({
    path:"guides"
  })
  next()
})


const Tour = mongoose.model("Tour", tourSchema)
module.exports = Tour