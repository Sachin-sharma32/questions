const nodemailer = require('nodemailer')
const catchAsync = require('./catchAsync')

const sendEmail = catchAsync(async (options) =>{
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth:{
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const emailOptions = {
    from: 'sachin sharma <sachin2sharma001@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text
  }

  await transporter.sendMail(emailOptions)
})

module.exports = sendEmail;