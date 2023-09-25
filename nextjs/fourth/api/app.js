const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const tourRouter = require('./routers/tourRoutes')
const userRouter = require('./routers/userRoutes')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const sanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AppError = require('./utils/AppError')

process.on("uncaughtException", err =>{
  console.log(err)
})

const app = express()
app.use(express.json({ limit: '10kb' }))
app.use(compression())
if (process.env.NODE_ENV === 'production ') {
  app.use(helmet())
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from the same url please try after 1 hour',
})
app.use('/api', limiter)
app.use(cookieParser())
app.use(sanitize())
app.use(xss())
app.use(compression())
app.use(cors())
app.options('*', cors())

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `${req.originalUrl} not found on server`,
  })
})
//* npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev


const handleCastError = (error) =>{
  return new AppError("no tour exist with this id", 404)
}

const handleDuplicateError = (error) =>{
  return new AppError("a doc already exist with this name")
}

const handleValidationError = (error) =>{
  const messages = Object.values(error.errors).map(el => el.message);
  return new AppError(messages.join(","))
}

process.on("unhandledRejection", err =>{
  console.log(err)
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  if(process.env.NODE_ENV === 'development'){
    res.status(statusCode).json({
      status,
      message:err.message,
      error: err,
      stack: err.stack
    })
  }else if(process.env.NODE_ENV === 'production '){
    let error = err;

    if(err.name === 'CastError') error = handleCastError(error);
    if(err.code === 11000) error = handleDuplicateError(error);
    if(err.name === 'ValidationError') error = handleValidationError(error)

    res.status(statusCode).json({
      status:status,
      message:error.message,
      error
    })
  }
  next();
})

module.exports = app
