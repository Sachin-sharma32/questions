const express = require('express')
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  bestTours,
  tourStats,
  getMonthlyPlan
} = require('../controllers/tourController')

const {protect, restrictTo} = require('../controllers/authController')

const router = express.Router()

router.route('/top-5-cheap').get(bestTours, getAllTours)
router.route('/tour-stats').get(tourStats)
router.route('/monthly-plan').get(getMonthlyPlan)
router.route('/').get(protect,getAllTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(protect, restrictTo("admin") ,deleteTour)

module.exports = router
