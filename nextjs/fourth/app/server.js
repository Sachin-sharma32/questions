const mongoose = require('mongoose')
const app = require('./app')

const DB = process.env.DATABASE;
mongoose.connect(DB).then(connection=>{
  console.log("connected to db ❤️‍🔥")
})

const server = app;
server.listen(3000, ()=>{
  console.log("server is up and running")
})