const Tour = require('../models/tourModel')
const {getAll,getOne,createOne,updateOne,deleteOne} = require('./handlerFactor')

exports.getAllTours = getAll(Tour);
exports.getTour = getOne(Tour);
exports.createTour = createOne(Tour);
exports.updateTour = updateOne(Tour);
exports.deleteTour = deleteOne(Tour);


exports.bestTours = (req,res,next) =>{
  req.query.sort = "price";
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage"
  next()
}

exports.tourStats = async(req,res) =>{
  const stats  = await Tour.aggregate([
    {
      $match: {ratingsAverage: {$gte: 4}}
    },
    {
      $group:{
        _id:"$difficulty",
        tours: {$sum: 1},
        maxPrice: {$max: "$price"},
        minPrice: {$min: "$price"},
        avgRating: {$avg: "$ratingsAverage"}
      }
    },
    {
      $sort: {maxPrice: 1}
    }
  ])
  res.status(200).json({
    status:"success",
    data:stats
  })
}

exports.getMonthlyPlan = async(req,res) =>{
  const year = req.query.year;
  const stats = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {startDates:{
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`)
      }}
    },
    {
      $group:{
        _id: {$month: "$startDates"},
        tours:{$sum: 1},
        avgRating: {$avg: "$ratingsAverage"},
        ratingsQunatity: {$sum: "$ratingsQuantity"},
      }
    },
    {
      $project: {_id: 0}
    },
    {
      $sort: {avgRating: 1}
    }
  ])
  res.status(200).json({
    status:"success",
    data:stats
  })
}