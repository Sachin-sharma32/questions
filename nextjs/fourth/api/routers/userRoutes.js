const express = require('express');
const { getAllUsers, getUser, getMe} = require('../controllers/userController');
const {signUp, logIn, forgotPassword, resetPassword} = require('../controllers/authController')

const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/sign-up').post(signUp)
router.route('/log-in').post(logIn)
router.route('/:id').get(getMe, getUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-passowrd/:token').post(resetPassword)


module.exports = router