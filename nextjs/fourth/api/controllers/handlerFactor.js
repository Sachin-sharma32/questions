const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/APIFeatures')
const catchAsync = require('../utils/catchAsync');

exports.getAll = (Model) => catchAsync(async (req, res) => {
  const features = new APIFeatures(Model, req.query)
    .filter()
    .sort()
    .pagination()
    .fieldLimit()
  const docs = await features.Model

  res.status(200).json({
    status: 'success',
    data: docs,
  })
})

exports.getOne = (Model) => catchAsync(async (req, res) => {
    const id = req.params.id
    const doc = await Model.findById(id)

    res.status(200).json({
      status: 'success',
      data: doc,
    })
})

exports.updateOne = (Model) => catchAsync(async (req, res) => {
  const id = req.params.id
  const doc = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: doc,
  })
})

exports.deleteOne = (Model) => catchAsync(async (req, res) => {
  const id = req.params.id
  const doc = await Model.findByIdAndDelete(id)
  res.status(200).json({
    status: 'success',
    data: null,
  })
})

exports.createOne = (Model) => catchAsync(async (req, res) => {
  const doc = await Model.create(req.body)
  res.status(200).json({
    status: 'success',
    data: doc,
  })
})
